import { inject, value, computed, watch } from 'vue-function-api';

export function useKuzzle(config) {
  const configProvider = config && config.provider;
  const cached = getFromCache(configProvider, config);
  if (cached) {
    return cached;
  }

  const provider = configProvider || inject('kuzzleProvider');
  if (!provider) {
    throw new Error(
      `[useKuzzle] Missing 'kuzzleProvider' to be provided via 'provide'`,
    );
  }

  if (configProvider) {
    const defaultCached = getFromCache(provider, config);
    if (defaultCached) {
      setToCache(null, config, defaultCached);
      return defaultCached;
    }
  }

  const defaultIndex = provider.defaultIndex;
  const defaultCollection = provider.defaultCollection;

  const getClient = options => {
    if (options && options.client) {
      if (typeof options.client === 'object') {
        return options.client;
      }
      if (!provider.clients) {
        throw new Error(
          `[useKuzzle] Missing 'clients' options in 'kuzzleProvider'`,
        );
      } else {
        const client = provider.clients[options.client];
        if (!client) {
          throw new Error(
            `[useKuzzle] Missing client '${
              options.client
            }' in 'kuzzleProvider'`,
          );
        }
        return client;
      }
    }
    if (!config || !config.client) {
      return provider.defaultClient;
    }
    const client = provider.clients[config.client];
    if (!client) {
      throw new Error(
        `[useKuzzle] Missing client '${config.client}' in 'kuzzleProvider'`,
      );
    }
    return client;
  };

  const getIndexAndCollection = (options, throwWithMethodName) => {
    const index = (options && options.index) || defaultIndex;
    const collection = (options && options.collection) || defaultCollection;
    if (throwWithMethodName) {
      if (!index) {
        throw new Error(
          `[useKuzzle] Missing index in '${throwWithMethodName}'`,
        );
      }
      if (!collection) {
        throw new Error(
          `[useKuzzle] Missing collection in '${throwWithMethodName}'`,
        );
      }
    }
    return { index, collection };
  };

  const query = (body, options) => {
    const { index, collection } = getIndexAndCollection(options);
    try {
      return getClient(options).query({
        index,
        collection,
        controller: options.controller,
        action: options.action,
        _id: options.id,
        body,
        refresh: 'wait_for',
      });
    } catch (e) {
      throw new Error(`[useKuzzle] ${e}`);
    }
  };

  const get = async (id, options) => {
    const { index, collection } = getIndexAndCollection(options, 'getDocument');
    const response = await getClient(options).document.get(
      index,
      collection,
      id,
    );
    return {
      ...response._source,
      _kuzzle_response: response,
    };
  };

  const search = async (query, options) => {
    const { index, collection } = getIndexAndCollection(
      options,
      'searchDocuments',
    );
    const _kuzzle_response = await getClient(options).document.search(
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
  };

  const create = async (doc, options) => {
    const { index, collection } = getIndexAndCollection(
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
      _kuzzle_response = await getClient(options).document.createOrReplace(
        index,
        collection,
        options && options.id,
        doc,
        {
          refresh: 'wait_for',
        },
      );
    }
    _kuzzle_response = await getClient(options).document.create(
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
  };

  const change = async (id, doc, options) => {
    const { index, collection } = getIndexAndCollection(
      options,
      'changeDocument',
    );
    let _kuzzle_response;
    if (options && options.replace === true) {
      _kuzzle_response = await getClient(options).document.replace(
        index,
        collection,
        id,
        doc,
        {
          refresh: 'wait_for',
        },
      );
    }
    _kuzzle_response = await getClient(options).document.update(
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
  };

  const deleteDoc = (id, options) => {
    const { index, collection } = getIndexAndCollection(
      options,
      'deleteDocument',
    );
    return getClient(options).document.delete(index, collection, id, {
      refresh: 'wait_for',
    });
  };

  const kuzzle = {
    provider,
    getClient,
    query,
    get,
    search,
    create,
    change,
    delete: deleteDoc,
  };

  setToCache(configProvider, config, kuzzle);

  return kuzzle;
}

export function fetchKuzzle(options) {
  if (!options || !options.document) {
    throw new Error('[fetchKuzzle] Missing `document` in options');
  }

  const kuzzle = useKuzzle(options);
  const loading = value(false);
  const data = value(null);
  const error = value(null);

  const documentId =
    typeof options.document === 'function'
      ? computed(options.document)
      : value(options.document);
  const skip =
    typeof options.skip === 'function'
      ? computed(options.skip)
      : value(options.skip);

  watch(
    () => {
      if (skip.value) {
        return null;
      }
      return documentId.value;
    },
    async id => {
      if (!id) {
        return;
      }
      loading.value = true;
      await kuzzle.provider.connectAll();
      try {
        const { _kuzzle_response, ...dataValue } = await kuzzle.get(
          id,
          options,
        );
        loading.value = false;
        if (options.update) {
          data.value = options.update(dataValue, _kuzzle_response);
        } else {
          data.value = dataValue;
        }
      } catch (err) {
        error.value = err;
        loading.value = false;
        if (typeof options.error === 'function') {
          options.error(err);
        }
      }
    },
    {
      lazy: false,
    },
  );

  return {
    kuzzle,
    loading,
    data,
    error,
  };
}

export function searchKuzzle(options) {
  if (!options || !options.search) {
    throw new Error('[searchKuzzle] Missing `search` in options');
  }

  const kuzzle = useKuzzle(options);
  const loading = value(false);
  const data = value(null);
  const error = value(null);
  const response = value(null);

  const searchQuery =
    typeof options.search === 'function'
      ? computed(options.search)
      : value(options.search);
  const skip =
    typeof options.skip === 'function'
      ? computed(options.skip)
      : value(options.skip);

  const setData = (dataValue, resp) => {
    response.value = resp;
    if (options.update) {
      data.value = options.update(dataValue, resp);
    } else {
      data.value = dataValue;
    }
  };

  const setError = err => {
    error.value = err;
    loading.value = false;
    if (typeof options.error === 'function') {
      options.error(err);
    } else {
      console.error(err);
    }
  };

  watch(
    () => {
      if (skip.value) {
        return null;
      }
      return searchQuery.value;
    },
    async search => {
      if (!search) {
        return;
      }
      loading.value = true;
      await kuzzle.provider.connectAll();
      try {
        const resp = await kuzzle.search(
          search.query || search,
          search.query
            ? {
                ...options,
                aggregations: search.aggregations,
                sort: search.sort,
                from: search.from,
                size: search.size,
              }
            : {},
        );
        loading.value = false;
        setData(resp, resp._kuzzle_response);
      } catch (err) {
        setError(err);
      }
    },
    {
      lazy: false,
    },
  );

  const hasMore = computed(() => {
    return response.value
      ? response.value.fetched < response.value.total
      : false;
  });

  const fetchMore = async () => {
    if (!response.value) {
      return;
    }

    loading.value = true;
    try {
      const moreResponse = await response.value.next();
      const fetchMoreData = moreResponse.hits.map(({ _source }) => _source);
      if (fetchMoreData.length > 0) {
        setData([...data.value, ...fetchMoreData], response.value);
      }
    } catch (err) {
      setError(err);
    }
  };

  return {
    kuzzle,
    loading,
    data,
    error,
    hasMore,
    fetchMore,
  };
}

//
// useKuzzle cache
//

const useKuzzleCache = new Map();

const getProviderKey = provider => {
  return provider || 'default';
};

const getConfigKey = config => {
  let configKey = null;
  if (config) {
    configKey = config.client || 'default';
  }
  return configKey || 'default';
};

function getFromCache(provider, config) {
  const providerKey = getProviderKey(provider);
  const cacheHit = useKuzzleCache.get(providerKey);
  if (!cacheHit) {
    return null;
  }
  const configKey = getConfigKey(config);
  return cacheHit[configKey];
}

function setToCache(provider, config, kuzzle) {
  const providerKey = getProviderKey(provider);
  const cacheHit = useKuzzleCache.get(providerKey);
  const configKey = getConfigKey(config);
  let newCacheHit = cacheHit;
  if (!newCacheHit) {
    newCacheHit = {};
  }
  newCacheHit[configKey] = kuzzle;
  useKuzzleCache.set(providerKey, newCacheHit);
}
