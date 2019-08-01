import { inject, value, computed, watch } from 'vue-function-api';
import { getRootChanges } from './utils';

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
    getIndexAndCollection,
  };

  setToCache(configProvider, config, kuzzle);

  return kuzzle;
}

export function fetchKuzzle(options) {
  if (!options || !options.document) {
    throw new Error('[fetchKuzzle] Missing `document` in options');
  }

  const kuzzle = useKuzzle(options);
  const isReading = value(false);
  const isWriting = value(false);
  const rawData = value(null);
  const error = value(null);

  const documentId =
    typeof options.document === 'function'
      ? computed(options.document)
      : value(options.document);
  const skip =
    typeof options.skip === 'function'
      ? computed(options.skip)
      : value(options.skip);

  const setError = err => {
    error.value = err;
    isReading.value = false;
    isWriting.value = false;
    if (typeof options.error === 'function') {
      options.error(err);
    } else {
      console.error(err);
    }
  };

  let changePromise;

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
      isReading.value = true;
      await kuzzle.provider.connectAll();
      try {
        const { _kuzzle_response, ...dataValue } = await kuzzle.get(
          id,
          options,
        );
        isReading.value = false;
        if (options.update) {
          rawData.value = options.update(dataValue, _kuzzle_response);
        } else {
          rawData.value = dataValue;
        }
        if (!changePromise) {
          changePromise = Promise.resolve(rawData.value);
        }
      } catch (err) {
        setError(err);
      }
    },
    {
      lazy: false,
    },
  );

  const change = async newDoc => {
    isWriting.value = true;
    if (!changePromise) {
      changePromise = Promise.resolve(null);
    }
    const currentChangeRun = (changePromise = changePromise.then(
      async savedDoc => {
        const isUpdate =
          savedDoc &&
          Object.keys(savedDoc).every(
            key => key === '_kuzzle_info' || newDoc.hasOwnProperty(key),
          );
        // Prepare changeDoc
        let changeDoc = isUpdate ? getRootChanges(savedDoc, newDoc) : newDoc;
        const { index, collection } = kuzzle.getIndexAndCollection(
          options,
          'change',
        );
        const changeContext = {
          kuzzle,
          index,
          collection,
          id: documentId.value,
          savedDocument: savedDoc,
          changedDocument: newDoc,
          // key missing
        };
        const changeFilter =
          options.changeFilter || kuzzle.provider.changeFilter;
        if (typeof changeFilter === 'function') {
          try {
            changeDoc = await Promise.resolve(
              changeFilter(changeDoc, changeContext),
            );
          } catch (err) {
            setError(err);
            return savedDoc;
          }
        }
        // No changes to be applied
        if (!changeDoc || Object.keys(changeDoc).length === 0) {
          isWriting.value = false;
          return savedDoc;
        }
        // Attempt change
        const client = kuzzle.getClient(options);
        try {
          let updateResp;
          if (!documentId.value) {
            updateResp = await client.document.create(
              index,
              collection,
              changeDoc,
              null,
              {
                refresh: 'wait_for',
              },
            );
          } else if (!isUpdate) {
            updateResp = await client.document.createOrReplace(
              index,
              collection,
              documentId.value,
              changeDoc,
              {
                refresh: 'wait_for',
              },
            );
          } else {
            updateResp = await client.document.update(
              index,
              collection,
              documentId.value,
              changeDoc,
              {
                refresh: 'wait_for',
              },
            );
          }
          const serverDoc = (await client.document.get(
            index,
            collection,
            updateResp._id,
          ))._source;
          let returnDoc = serverDoc;
          if (typeof options.update === 'function') {
            returnDoc = await Promise.resolve(
              options.update(
                serverDoc,
                updateResp,
                updateResp.created ? 'created' : updateResp.result,
              ),
            );
          }
          if (changePromise === currentChangeRun) {
            rawData.value = returnDoc;
          }
          isWriting.value = false;
          return returnDoc;
        } catch (err) {
          setError(err);
          return savedDoc;
        }
      },
    ));
    return currentChangeRun.then(() => rawData.value);
  };

  const isLoading = computed(() => {
    return isReading.value || isWriting.value;
  });

  const data = computed(() => rawData.value, change);

  return {
    kuzzle,
    isReading,
    isWriting,
    isLoading,
    data,
    error,
    change,
  };
}

export function searchKuzzle(options) {
  if (!options || !options.search) {
    throw new Error('[searchKuzzle] Missing `search` in options');
  }

  const kuzzle = useKuzzle(options);
  const isLoading = value(false);
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
    isLoading.value = false;
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
      isLoading.value = true;
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
        isLoading.value = false;
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

    isLoading.value = true;
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
    isLoading,
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
