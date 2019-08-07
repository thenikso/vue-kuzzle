import Vue, { AsyncComponent } from 'vue';
import { Kuzzle } from 'kuzzle-sdk';
import { VueKuzzleComponentOption, FetchFilter } from './options';
import {
  WatchLoading,
  ErrorHandler,
  VueKuzzleOptions,
  ChangeFilter,
} from './options';
import { UseKuzzle } from './useKuzzle';

export type VueKuzzleComponent<V extends Vue = Vue> =
  | VueKuzzleComponentOption<V>
  | typeof Vue
  | AsyncComponent;

export class KuzzleProvider<V = any> {
  constructor(options: {
    defaultClient: Kuzzle;
    defaultIndex?: string;
    defaultCollection?: string;
    defaultOptions?: VueKuzzleOptions<V>;
    clients?: { [key: string]: Kuzzle };
    watchLoading?: WatchLoading<V>;
    errorHandler?: ErrorHandler<V>;
    /**
     * A filter function to be applied to all documents before they are
     * changed. This method should return the document to be sent to the server.
     */
    beforeChange?: ChangeFilter<V>;
    /**
     * A filter function to be applied to all documents or searches that are
     * fetched from the server.
     */
    afterFetch?: FetchFilter<V>;
  });
  clients: { [key: string]: Kuzzle };
  defaultClient: Kuzzle;
  defaultIndex?: string;
  defaultCollection?: string;

  connectAll(): Promise<void>;
}
