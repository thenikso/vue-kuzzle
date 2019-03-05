export default class SmartKuzzle {
  constructor(vm, key, options, autostart = true) {
    this.type = null;
    this.vm = vm;
    this.key = key;
    this.initialOptions = options;
    this.options = Object.assign({}, options);
    this._skip = false;
    this._watchers = [];
    this._destroyed = false;
    this._loading = false;

    if (vm.$data.$kuzzleData && !vm.$data.$kuzzleData.queries[key]) {
      vm.$set(vm.$data.$kuzzleData.queries, key, {
        loading: false,
      });
    }

    this._hasDataField = this.vm.$data.hasOwnProperty(key);
    this._initData();

    if (autostart) {
      this.autostart();
    }
  }

  autostart() {
    if (typeof this.options.skip === 'function') {
      this._skipWatcher = this.vm.$watch(
        this.options.skip.bind(this.vm),
        this.skipChanged.bind(this),
        {
          immediate: true,
          deep: this.options.deep,
        },
      );
    } else if (!this.options.skip) {
      this.start();
    } else {
      this._skip = true;
    }
  }

  skipChanged(value, oldValue) {
    if (value !== oldValue) {
      this.skip = value;
    }
  }

  get skip() {
    return this._skip;
  }

  set skip(value) {
    if (value) {
      this.stop();
    } else {
      this.start();
    }
    this._skip = value;
  }

  get hasMore() {
    return false;
  }

  fetchMore() {}

  async refresh() {
    if (!this._skip) {
      await this.stop();
      await this.start();
    }
  }

  get client() {
    const key = this.options.client || 'defaultClient';
    return this.vm.$kuzzle.provider.clients[key];
  }

  get clientSupportsRealtime() {
    return typeof this.client.protocol.http === 'undefined';
  }

  get index() {
    const index =
      this.options.index ||
      this.vm.$kuzzle.index ||
      this.vm.$kuzzle.provider.defaultIndex;
    if (!index) {
      throw new Error('Index was not specified');
    }
    return index;
  }

  get collection() {
    const collection =
      this.options.collection ||
      this.vm.$kuzzle.collection ||
      this.vm.$kuzzle.provider.defaultCollection;
    if (!collection) {
      throw new Error('Collection was not specified');
    }
    return collection;
  }

  get loading() {
    return this.vm.$data.$kuzzleData &&
      this.vm.$data.$kuzzleData.queries[this.key]
      ? this.vm.$data.$kuzzleData.queries[this.key].loading
      : this._loading;
  }

  set loading(value) {
    if (this._loading !== value) {
      this._loading = value;
      if (
        this.vm.$data.$kuzzleData &&
        this.vm.$data.$kuzzleData.queries[this.key]
      ) {
        this.vm.$data.$kuzzleData.queries[this.key].loading = value;
        this.vm.$data.$kuzzleData.loading += value ? 1 : -1;
      }
    }
  }

  start() {
    this.starting = true;

    // Document callback
    if (typeof this.initialOptions.document === 'function') {
      const cb = this.initialOptions.document.bind(this.vm);
      this.options.document = cb();
      this._watchers.push(
        this.vm.$watch(
          cb,
          res => {
            this.options.document = res;
            this.refresh();
          },
          {
            deep: this.options.deep,
          },
        ),
      );
    }

    // Search callback
    if (typeof this.initialOptions.search === 'function') {
      const cb = this.initialOptions.search.bind(this.vm);
      this.options.search = cb();
      this._watchers.push(
        this.vm.$watch(
          cb,
          res => {
            this.options.search = res;
            this.refresh();
          },
          {
            deep: this.options.deep,
          },
        ),
      );
    }

    return this.executeKuzzle();
  }

  async stop() {
    for (const unwatch of this._watchers) {
      unwatch();
    }

    if (this.sub) {
      await this.client.realtime.unsubscribe(this.sub);
      this.sub = null;
    }
  }

  executeKuzzle() {
    this.starting = false;
  }

  _initData() {
    if (!this.options.manual) {
      if (this._hasDataField) {
        Object.defineProperty(this.vm.$data.$kuzzleData.data, this.key, {
          get: () => this.vm.$data[key],
          enumerable: true,
          configurable: true,
        });
      } else {
        Object.defineProperty(this.vm.$data, this.key, {
          get: () => this.vm.$data.$kuzzleData.data[key],
          enumerable: true,
          configurable: true,
        });
      }
    }
  }

  setData(value) {
    if (typeof value === 'object') {
      Object.freeze(value);
    }
    this.vm.$set(
      this._hasDataField ? this.vm.$data : this.vm.$data.$kuzzleData.data,
      this.key,
      value,
    );
  }

  getData() {
    if (this._hasDataField) {
      return this.vm.$data[this.key];
    }
    return this.vm.$data.$kuzzleData.data[this.key];
  }

  callHandlers(handlers, ...args) {
    let catched = false;
    for (const handler of handlers) {
      if (handler) {
        catched = true;
        let result = handler.apply(this.vm, args);
        if (typeof result !== 'undefined' && !result) {
          break;
        }
      }
    }
    return catched;
  }

  errorHandler(...args) {
    return this.callHandlers(
      [
        this.options.error,
        this.vm.$kuzzle.error,
        this.vm.$kuzzle.provider.errorHandler,
      ],
      ...args,
    );
  }

  catchError(error) {
    const catched = this.errorHandler(error);

    if (catched) return;

    console.error(
      `[vue-kuzzle] An error has occured for ${this.type} '${this.key}'`,
    );
    if (Array.isArray(error)) {
      console.error(...error);
    } else {
      console.error(error);
    }
  }

  destroy() {
    if (this._destroyed) return;

    this._destroyed = true;
    this.stop();
    if (this._skipWatcher) {
      this._skipWatcher();
    }
  }
}
