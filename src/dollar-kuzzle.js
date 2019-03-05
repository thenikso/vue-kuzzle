import SmartDocument from './smart-document';
import SmartSearch from './smart-search';
import { reapply } from './utils';

export class DollarKuzzle {
  constructor(vm) {
    this._kuzzleSubscriptions = [];
    this._watchers = [];

    this.vm = vm;
    this.queries = {};
    this.documents = {};
    this.searches = {};
    this.client = undefined;
    this.loadingKey = undefined;
    this.error = undefined;
  }

  get provider() {
    return this.vm.$kuzzleProvider;
  }

  get loading() {
    return this.vm.$data.$kuzzleData.loading !== 0;
  }

  get data() {
    return this.vm.$data.$kuzzleData.data;
  }

  getClient(options) {
    if (!options || !options.client) {
      if (typeof this.client === 'object') {
        return this.client;
      }
      if (this.client) {
        if (!this.provider.clients) {
          throw new Error(
            `[vue-kuzzle] Missing 'clients' options in 'kuzzleProvider'`,
          );
        } else {
          const client = this.provider.clients[this.client];
          if (!client) {
            throw new Error(
              `[vue-kuzzle] Missing client '${
                this.client
              }' in 'kuzzleProvider'`,
            );
          }
          return client;
        }
      }
      return this.provider.defaultClient;
    }
    const client = this.provider.clients[options.client];
    if (!client) {
      throw new Error(
        `[vue-kuzzle] Missing client '${options.client}' in 'kuzzleProvider'`,
      );
    }
    return client;
  }

  query(body, options) {
    const { index, collection } = this.getIndexAndCollection(options);
    try {
      return this.getClient(options).query({
        index,
        collection,
        controller: options.controller,
        action: options.action,
        _id: options.id,
        body,
        refresh: 'wait_for',
      });
    } catch (e) {
      throw new Error(`[vue-kuzzle] ${e}`);
    }
  }

  async get(id, options) {
    const { index, collection } = this.getIndexAndCollection(
      options,
      'getDocument',
    );
    const response = await this.getClient(options).document.get(
      index,
      collection,
      id,
    );
    return {
      ...response._source,
      _kuzzle_response: response,
    };
  }

  async search(query, options) {
    const { index, collection } = this.getIndexAndCollection(
      options,
      'searchDocuments',
    );
    const _kuzzle_response = await this.getClient(options).document.search(
      index,
      collection,
      {
        query,
        aggregations: options && options.aggregations,
        sort: options && options.sort,
      },
      {
        from: (options && options.from) || 0,
        size: (options && options.size) || 10,
      },
    );
    const hits = (_kuzzle_response.hits || []).slice();
    hits._kuzzle_response = _kuzzle_response;
    return hits;
  }

  async create(doc, options) {
    const { index, collection } = this.getIndexAndCollection(
      options,
      'createDocument',
    );
    let _kuzzle_response;
    if (options && options.replace === true) {
      if (!options.id) {
        throw new Error(
          "[vue-kuzzle] Missing 'id' in 'createDocument' called with 'replace: true'",
        );
      }
      _kuzzle_response = await this.getClient(options).document.createOrReplace(
        index,
        collection,
        options && options.id,
        doc,
        {
          refresh: 'wait_for',
        },
      );
    }
    _kuzzle_response = await this.getClient(options).document.create(
      index,
      collection,
      doc,
      options && options.id,
      {
        refresh: 'wait_for',
      },
    );
    return {
      ..._kuzzle_response._source,
      _kuzzle_response,
    };
  }

  async change(id, doc, options) {
    const { index, collection } = this.getIndexAndCollection(
      options,
      'changeDocument',
    );
    let _kuzzle_response;
    if (options && options.replace === true) {
      _kuzzle_response = await this.getClient(options).document.replace(
        index,
        collection,
        id,
        doc,
        {
          refresh: 'wait_for',
        },
      );
    }
    _kuzzle_response = await this.getClient(options).document.update(
      index,
      collection,
      id,
      doc,
      {
        refresh: 'wait_for',
      },
    );
    return {
      ..._kuzzle_response._source,
      _kuzzle_response,
    };
  }

  delete(id, options) {
    const { index, collection } = this.getIndexAndCollection(
      options,
      'deleteDocument',
    );
    return this.getClient(options).document.delete(index, collection, id, {
      refresh: 'wait_for',
    });
  }

  addSmartDocumentOrSearch(key, options) {
    const finalOptions = reapply(options, this.vm);

    let smart;
    if (typeof finalOptions.document !== 'undefined') {
      smart = this.queries[key] = this.documents[key] = new SmartDocument(
        this.vm,
        key,
        finalOptions,
        false,
      );
    } else if (finalOptions.search !== 'undefined') {
      smart = this.queries[key] = this.searches[key] = new SmartSearch(
        this.vm,
        key,
        finalOptions,
        false,
      );
    } else {
      throw new Error(
        `[vue-kuzzle] Missing either 'document' or 'search' in 'kuzzle.${key}' options`,
      );
    }

    if (!this.vm.$isServer) {
      smart.autostart();
    }

    // if (!this.vm.$isServer) {
    //   const subs = finalOptions.subscribeToMore;
    //   if (subs) {
    //     if (Array.isArray(subs)) {
    //       subs.forEach((sub, index) => {
    //         this.addSmartSubscription(`${key}${index}`, {
    //           ...sub,
    //           linkedQuery: smart,
    //         });
    //       });
    //     } else {
    //       this.addSmartSubscription(key, {
    //         ...subs,
    //         linkedQuery: smart,
    //       });
    //     }
    //   }
    // }

    return smart;
  }

  // addSmartSubscription(key, options) {
  //   if (!this.vm.$isServer) {
  //     options = reapply(options, this.vm);

  //     const smart = (this.subscriptions[key] = new SmartSearch(
  //       this.vm,
  //       key,
  //       options,
  //       false,
  //     ));
  //     smart.autostart();

  //     return smart;
  //   }
  // }

  defineReactiveSetter(key, func, deep) {
    this._watchers.push(
      this.vm.$watch(
        func,
        value => {
          this[key] = value;
        },
        {
          immediate: true,
          deep,
        },
      ),
    );
  }

  getIndexAndCollection(options, throwWithMethodName) {
    const index =
      (options && options.index) || this.index || this.provider.defaultIndex;
    const collection =
      (options && options.collection) ||
      this.collection ||
      this.provider.defaultCollection;
    if (throwWithMethodName) {
      if (!index) {
        throw new Error(
          `[vue-kuzzle] Missing index in '${throwWithMethodName}'`,
        );
      }
      if (!collection) {
        throw new Error(
          `[vue-kuzzle] Missing collection in '${throwWithMethodName}'`,
        );
      }
    }
    return { index, collection };
  }

  destroy() {
    for (const unwatch of this._watchers) {
      unwatch();
    }
    for (let key in this.queries) {
      this.queries[key].destroy();
    }
    // this._kuzzleSubscriptions.forEach(sub => {
    //   sub.unsubscribe();
    // });
    // this._kuzzleSubscriptions = null;
    this.vm = null;
  }
}
