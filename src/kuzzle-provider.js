export class KuzzleProvider {
  constructor(options) {
    if (!options) {
      throw new Error('Options argument required');
    }
    this.clients = options.clients || {};
    this.clients.defaultClient = this.defaultClient = options.defaultClient;
    this.defaultOptions = options.defaultOptions || {};
    this.defaultIndex = options.defaultIndex;
    this.defaultCollection = options.defaultCollection;
    this.watchLoading = options.watchLoading;
    this.errorHandler = options.errorHandler;
    this.beforeChange = options.beforeChange;
    this.afterFetch = options.afterFetch;

    this.connectAll();
  }

  connectAll() {
    if (!this._connectAllPromise) {
      this._connectAllPromise = Promise.all(
        Object.values(this.clients).map(client => client.connect()),
      );
    }
    return this._connectAllPromise;
  }
}
