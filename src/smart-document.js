import SmartKuzzle from './smart-kuzzle';
import { eq, getRootChanges } from './utils';

export default class SmartQuery extends SmartKuzzle {
  constructor(vm, key, options, autostart = true) {
    // Simple document query
    if (typeof options !== 'object') {
      const doc = options;
      options = {
        document: doc,
      };
    }

    super(vm, key, options, false);
    this.type = 'document';

    if (vm.$data.$kuzzleData && !vm.$data.$kuzzleData.documents[key]) {
      vm.$set(
        vm.$data.$kuzzleData.documents,
        key,
        vm.$data.$kuzzleData.queries[key],
      );
    }

    this.firstRun = new Promise((resolve, reject) => {
      this._firstRunResolve = resolve;
      this._firstRunReject = reject;
    });

    this.changeRun = this.firstRun.then(() => this.getData());

    // if (this.vm.$isServer) {
    //   this.options.fetchPolicy = 'network-only';
    // }
  }

  async executeKuzzle() {
    this.starting = true;

    const { document: id, subscribe } = this.options;

    this.setLoading();
    let response;
    try {
      response = await this.client.document.get(
        this.index,
        this.collection,
        id,
      );
      if (response) {
        await this.nextResult(response._source, response, 'get');
      }
      this.loadingDone();
    } catch (error) {
      this.catchError(error);
    }

    if (subscribe) {
      // TODO create new SmartSubscription instead
      await this.startDocumentSubscription(id);
    }

    super.executeKuzzle();
  }

  async startDocumentSubscription(id) {
    if (!this.clientSupportsRealtime || this.sub) return;

    try {
      this.sub = await this.client.realtime.subscribe(
        this.index,
        this.collection,
        {
          ids: {
            values: [id],
          },
        },
        notificaiton =>
          this.nextResult(
            notificaiton.result._source,
            notificaiton,
            'subscription',
          ),
        {
          subscribeToSelf: false,
        },
      );
    } catch (error) {
      this.catchError(error);
    }
  }

  async nextResult(doc, response, operation) {
    if (!doc) {
      return;
    }
    if (typeof this.options.update === 'function') {
      const respDoc = await Promise.resolve(
        this.options.update.call(this.vm, doc, response, operation),
      );
      this.setData(respDoc);
    } else {
      this.setData(doc);
    }
  }

  setLoading() {
    if (!this.loading) {
      this.applyLoadingModifier(1);
    }
    this.loading = true;
  }

  catchError(error) {
    super.catchError(error);
    this.loadingDone(error);
  }

  get loadingKey() {
    return this.options.loadingKey || this.vm.$kuzzle.loadingKey;
  }

  watchLoading(...args) {
    return this.callHandlers(
      [
        this.options.watchLoading,
        this.vm.$kuzzle.watchLoading,
        this.vm.$kuzzle.provider.watchLoading,
      ],
      ...args,
      this,
    );
  }

  applyLoadingModifier(value) {
    const loadingKey = this.loadingKey;
    if (loadingKey && typeof this.vm[loadingKey] === 'number') {
      this.vm[loadingKey] += value;
    }
    this.watchLoading(value === 1, value);
  }

  loadingDone(error = null) {
    if (this.loading) {
      this.applyLoadingModifier(-1);
    }
    this.loading = false;

    if (!error) {
      this.firstRunResolve();
    } else {
      this.firstRunReject();
    }
  }

  async refetch() {
    this.setLoading();
    let response;
    try {
      response = await this.client.document.get(
        this.index,
        this.collection,
        this.options.document,
      );
      this.loadingDone();
    } catch (error) {
      this.catchError(error);
    }
    if (response) {
      await this.nextResult(response._source, response, 'get');
    }
  }

  change(newDoc) {
    this.setLoading();
    this.changeRun = this.changeRun.then(async savedDoc => {
      const isUpdate =
        savedDoc &&
        Object.keys(savedDoc).every(key => newDoc.hasOwnProperty(key));
      let changeDoc = isUpdate ? getRootChanges(savedDoc, newDoc) : newDoc;
      const changeContext = {
        index: this.index,
        collection: this.collection,
        id: this.options.document,
        documentKey: this.key,
        savedDocument: savedDoc,
        changedDocument: newDoc,
      };
      const changeFilter =
        this.options.changeFilter ||
        this.vm.$kuzzle.changeFilter ||
        this.vm.$kuzzle.provider.changeFilter;
      if (typeof changeFilter === 'function') {
        try {
          changeDoc = await Promise.resolve(
            changeFilter.call(this.vm, changeDoc, changeContext),
          );
        } catch (error) {
          this.catchError(error);
          return savedDoc;
        }
      }
      if (!changeDoc || Object.keys(changeDoc).length === 0) {
        this.loadingDone();
        return savedDoc;
      }
      try {
        const updateResp = await this.client.document[
          isUpdate ? 'update' : 'createOrReplace'
        ](this.index, this.collection, this.options.document, changeDoc, {
          refresh: 'wait_for',
        });
        let returnDoc = newDoc;
        if (typeof this.options.update === 'function') {
          returnDoc = await Promise.resolve(
            this.options.update.call(
              this.vm,
              returnDoc,
              updateResp,
              updateResp.created ? 'created' : updateResp.result,
            ),
          );
        }
        this.setData(returnDoc);
        this.loadingDone();
        return returnDoc;
      } catch (error) {
        this.catchError(error);
        return savedDoc;
      }
    });
    return this.changeRun;
  }

  _initData() {
    if (!this.options.manual) {
      if (this._hasDataField) {
        Object.defineProperty(this.vm.$data.$kuzzleData.data, this.key, {
          get: () => this.vm.$data[key],
          set: value => this.change(value),
          enumerable: true,
          configurable: true,
        });
      } else {
        Object.defineProperty(this.vm.$data, this.key, {
          get: () => this.vm.$data.$kuzzleData.data[key],
          set: value => this.change(value),
          enumerable: true,
          configurable: true,
        });
      }
    }
  }

  firstRunResolve() {
    if (this._firstRunResolve) {
      this._firstRunResolve();
      this._firstRunResolve = null;
    }
  }

  firstRunReject() {
    if (this._firstRunReject) {
      this._firstRunReject();
      this._firstRunReject = null;
    }
  }

  destroy() {
    super.destroy();

    if (this.loading) {
      this.watchLoading(false, -1);
    }
    this.loading = false;
  }
}
