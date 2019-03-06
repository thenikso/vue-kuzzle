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

export class KuzzleProvider {
  constructor(options: {
    defaultClient: Kuzzle;
    defaultIndex?: string;
    defaultCollection?: string;
    defaultOptions?: VueKuzzleOptions<any>;
    clients?: { [key: string]: Kuzzle };
    watchLoading?: WatchLoading<any>;
    errorHandler?: ErrorHandler<any>;
    changeFilter?: ChangeFilter<any>;
  });
  clients: { [key: string]: Kuzzle };
  defaultClient: Kuzzle;
  defaultIndex?: string;
  defaultCollection?: string;

  connectAll(): Promise<void>;
}
