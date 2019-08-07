import {
  KuzzleDocumentGetResponse,
  KuzzleDocumentSearchResponse,
  KuzzleDocumentUpdateResponse,
} from 'kuzzle-sdk';
import { UseKuzzle } from './useKuzzle';

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
  sort?: (string | object)[];
  from?: number;
  size?: number;
};

export type FilterContext<Extra = never> = Extra & {
  index: string;
  collection: string;
  id: string;
};

export type ChangeFilter<V> = (
  this: VueKuzzleThisType<V>,
  changeDocument: any,
  changeContext: FilterContext<
    ([V] extends [never] ? { kuzzle: UseKuzzle } : { documentKey: string }) & {
      savedDocument: any;
      updatedDocument: any;
    }
  >,
) => any;

type UpdateFilterResponse<R> =
  | KuzzleDocumentResponse<R>
  | KuzzleDocumentSearchResponse<R>;

type UpdateFilterOperation = KuzzleDocumentOperation | 'search';

export type FetchFilter<V, R = any> = (
  this: VueKuzzleThisType<V>,
  data: R,
  resp: UpdateFilterResponse<R>,
  operation: UpdateFilterOperation,
) => any;

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

type KuzzleDocumentResponse<R> =
  | KuzzleDocumentGetResponse<R>
  | KuzzleDocumentUpdateResponse;

type KuzzleDocumentOperation = 'get' | 'subscription' | 'create' | 'update' | 'replace';

export interface VueKuzzleDocumentOptions<V, R>
  extends ExtendableVueKuzzleQueryOptions<V, R> {
  subscribe?: boolean;
  document: ((this: VueKuzzleThisType<V>) => string) | string;
  /**
   * Apply a transformation to get or update responses.
   */
  update?: (
    this: VueKuzzleThisType<V>,
    data: R,
    resp: KuzzleDocumentResponse<R>,
    op: KuzzleDocumentOperation,
  ) => any;
  /**
   * Apply a transformation to documents before they are sent to
   * the server. The returned document will be sent to the server.
   * Returning null or an empty object will cancel the change.
   */
  beforeChange?: ChangeFilter<V>;
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
