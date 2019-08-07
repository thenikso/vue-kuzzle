import Vue, { AsyncComponent } from 'vue';
import { Kuzzle } from 'kuzzle-sdk';
import { VueKuzzleComponentOption } from './options';
import {
  WatchLoading,
  ErrorHandler,
  VueKuzzleOptions,
  ChangeFilter,
} from './options';

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
  });
  clients: { [key: string]: Kuzzle };
  defaultClient: Kuzzle;
  defaultIndex?: string;
  defaultCollection?: string;

  connectAll(): Promise<void>;
}
