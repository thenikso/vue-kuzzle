import SmartKuzzle from './smart-kuzzle';

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
      response = await this.client.document.get(
        this.index,
        this.collection,
        id,
      );
      this.firstRunResolve();
      this.loadingDone();
    } catch (error) {
      this.firstRunReject();
      this.catchError(error);
    }

    if (response) {
      this.nextResult(response, response);
    }

    if (subscribe) {
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
        notificaiton => this.nextResult(notificaiton.result, notificaiton),
        {
          subscribeToSelf: false,
        },
      );
    } catch (error) {
      this.catchError(error);
    }
  }

  nextResult(doc, response) {
    if (!doc) {
      return;
    }
    const data = doc._source;
    if (typeof this.options.update === 'function') {
      this.setData(this.options.update.call(this.vm, data, response));
    } else {
      this.setData(data);
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
      this.nextResult(response, response);
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
