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
      await this.vm.$kuzzle.provider.connectAll();

      response = await this.client.document.get(
        this.index,
        this.collection,
        id,
      );
      if (response) {
        await this.nextResult(response._source, response, 'get');
      }
      this.loadingDone(null, response._source);
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
            notificaiton.result,
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
    if (typeof this.vm.$kuzzle.provider.afterFetch === 'function') {
      doc = this.vm.$kuzzle.provider.afterFetch.call(
        this.vm,
        doc,
        response,
        operation,
      );
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

  loadingDone(error, data) {
    if (this.loading) {
      this.applyLoadingModifier(-1);
    }
    this.loading = false;

    if (!error) {
      if (!this.changeRun) {
        this.changeRun = this.firstRun;
      }
      this.firstRunResolve(data);
    } else {
      this.firstRunReject(error);
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
    if (!this.changeRun) {
      this.changeRun = Promise.resolve(null);
    }
    if (typeof this.options.document === 'function') {
      const cb = this.options.document.bind(this.vm);
      this.options.document = cb();
    }
    const thisChangeRun = (this.changeRun = this.changeRun.then(
      async savedDoc => {
        const isUpdate =
          savedDoc &&
          Object.keys(savedDoc).every(
            key => key === '_kuzzle_info' || newDoc.hasOwnProperty(key),
          );
        let changeDoc = isUpdate ? getRootChanges(savedDoc, newDoc) : newDoc;
        const changeContext = {
          index: this.index,
          collection: this.collection,
          id: this.options.document,
          documentKey: this.key,
          savedDocument: savedDoc,
          changedDocument: newDoc,
        };
        const beforeChange =
          this.options.beforeChange ||
          this.vm.$kuzzle.beforeChange ||
          this.vm.$kuzzle.provider.beforeChange;
        if (typeof beforeChange === 'function') {
          try {
            changeDoc = await Promise.resolve(
              beforeChange.call(this.vm, changeDoc, changeContext),
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
          let updateResp;
          if (!this.options.document) {
            updateResp = await this.client.document.create(
              this.index,
              this.collection,
              changeDoc,
              null,
              {
                refresh: 'wait_for',
              },
            );
          } else if (!isUpdate) {
            updateResp = await this.client.document.createOrReplace(
              this.index,
              this.collection,
              this.options.document,
              changeDoc,
              {
                refresh: 'wait_for',
              },
            );
          } else {
            updateResp = await this.client.document.update(
              this.index,
              this.collection,
              this.options.document,
              changeDoc,
              {
                refresh: 'wait_for',
              },
            );
          }
          const serverDoc = (await this.client.document.get(
            this.index,
            this.collection,
            updateResp._id,
          ))._source;
          let returnDoc = serverDoc;
          if (typeof this.options.update === 'function') {
            returnDoc = await Promise.resolve(
              this.options.update.call(
                this.vm,
                serverDoc,
                updateResp,
                updateResp.created ? 'created' : updateResp.result,
              ),
            );
          }
          if (this.changeRun === thisChangeRun) {
            this.setData(returnDoc);
          }
          this.loadingDone();
          return serverDoc;
        } catch (error) {
          this.catchError(error);
          return savedDoc;
        }
      },
    ));
    return thisChangeRun.then(() => this.getData());
  }

  _initData() {
    if (!this.options.manual) {
      if (this._hasDataField) {
        Object.defineProperty(this.vm.$data.$kuzzleData.data, this.key, {
          get: () => this.vm.$data[this.key],
          set: value => this.change(value),
          enumerable: true,
          configurable: true,
        });
      } else {
        Object.defineProperty(this.vm.$data, this.key, {
          get: () => this.vm.$data.$kuzzleData.data[this.key],
          set: value => this.change(value),
          enumerable: true,
          configurable: true,
        });
      }
    }
  }

  firstRunResolve(data) {
    if (this._firstRunResolve) {
      this._firstRunResolve(data);
      this._firstRunResolve = null;
    }
  }

  firstRunReject(err) {
    if (this._firstRunReject) {
      this._firstRunReject(err);
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
