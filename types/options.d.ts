import {
  KuzzleDocumentGetResponse,
  KuzzleDocumentSearchResponse,
} from 'kuzzle-sdk';

type VueKuzzleThisType<V> = V & { [key: string]: any };

export type WatchLoading<V> = (
  this: VueKuzzleThisType<V>,
  isLoading: boolean,
  countModifier: number,
) => void;
export type ErrorHandler<V> = (this: VueKuzzleThisType<V>, error: any) => void;
export type VueKuzzleSearchConfig = {
  query?: object;
  aggregations?: object;
  sort?: object[];
  from?: number;
  size?: number;
};

interface ExtendableVueKuzzleQueryOptions<V, R> {
  client?: string;
  index?: string;
  collection?: string;
  result?: (this: VueKuzzleThisType<V>, data: R, loader: any) => void;
  error?: ErrorHandler<V>;
  loadingKey?: string;
  watchLoading?: WatchLoading<V>;
  skip?: (this: VueKuzzleThisType<V>) => boolean | boolean;
  manual?: boolean;
  deep?: boolean;
}

export interface VueKuzzleDocumentOptions<V, R>
  extends ExtendableVueKuzzleQueryOptions<V, R> {
  subscribe?: boolean;
  document: ((this: VueKuzzleThisType<V>) => string) | string;
  update?: (
    this: VueKuzzleThisType<V>,
    data: R,
    doc: KuzzleDocumentGetResponse<R>,
  ) => any;
}

export interface VueKuzzleSearchOptions<V, R>
  extends ExtendableVueKuzzleQueryOptions<V, R> {
  search:
    | ((this: VueKuzzleThisType<V>) => VueKuzzleSearchConfig)
    | VueKuzzleSearchConfig;
  update?: (
    this: VueKuzzleThisType<V>,
    data: R[],
    doc: KuzzleDocumentSearchResponse<R>,
  ) => any;
}

type QueryComponentProperty<V> =
  | ((this: VueKuzzleThisType<V>) => VueKuzzleDocumentOptions<V, any>)
  | VueKuzzleDocumentOptions<V, any>
  | ((this: VueKuzzleThisType<V>) => VueKuzzleSearchOptions<V, any>)
  | VueKuzzleSearchOptions<V, any>;

export type VueKuzzleOptions<V> = {
  $skip?: boolean;
  $deep?: boolean;
  $client?: string;
  $index?: string;
  $collection?: string;
  $loadingKey?: string;
  $watchLoading?: WatchLoading<V>;
  $error?: ErrorHandler<V>;
};

export interface VueKuzzleComponentOption<V> extends VueKuzzleOptions<V> {
  [key: string]:
    | QueryComponentProperty<V>
    | ExtendableVueKuzzleQueryOptions<V, any>
    | string
    | boolean
    | Function
    | undefined;
}
