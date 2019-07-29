import { inject } from 'vue-function-api';

export const kuzzleProvider = new Symbol('kuzzleProvider');

export function useKuzzle(config) {
  const provider =
    (config && config.provider) ||
    inject(kuzzleProvider) ||
    inject('kuzzleProvider');
  if (!provider) {
    throw new Error(
      `[useKuzzle] Missing 'kuzzleProvider' to be provided via 'provide'`,
    );
  }

  const defaultIndex = (config && config.index) || provider.defaultIndex;
  const defaultCollection =
    (config && config.collection) || provider.defaultCollection;

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
    if (typeof config.client === 'object') {
      return config.client;
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

  return {
    provider,
    getClient,
    query,
  };
}
