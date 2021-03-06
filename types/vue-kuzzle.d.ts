import Vue, { PluginObject, PluginFunction } from 'vue';
import { KuzzleProvider, VueKuzzleComponent } from './kuzzle-provider';
import {
  VueKuzzleOptions,
  WatchLoading,
  ErrorHandler,
  VueKuzzleDocumentOptions,
  VueKuzzleSearchOptions,
} from './options';
import {
  QueryResponse,
  KuzzleDocumentGetResponse,
  KuzzleDocumentSearchResponse,
  KuzzleMetadata,
  KuzzleDocumentCreateReplaceResponse,
} from 'kuzzle-sdk';

export class VueKuzzle<V = Vue> extends KuzzleProvider<V> implements PluginObject<{}> {
  [key: string]: any;
  install: PluginFunction<{}>;

  static install(pVue: typeof Vue, options?: {} | undefined): void;
}

interface SmartKuzzle<V> {
  readonly loading: boolean;
  readonly hasMore: boolean;
  skip: boolean;
  refresh(): Promise<void>;
  start(): Promise<void>;
  stop(): Promise<void>;
  fetchMore(): Promise<void>;
}

export interface SmartDocument<V> extends SmartKuzzle<V> {
  change(newDoc: any): Promise<any>;
  readonly changeRun: Promise<any>;
}

export interface SmartSearch<V> extends SmartKuzzle<V> {}

type DollarKuzzleOptions = {
  client?: string;
  index?: string;
  collection?: string;
};

type DollarKuzzleQueryOptions = DollarKuzzleOptions & {
  controller: string;
  action: string;
  id?: string;
};

type DollarKuzzleSearchOptions = DollarKuzzleOptions & {
  // TODO elasticsearch aggregations type
  aggregations?: object;
  // TODO elasticsearch sort type
  sort?: object[];
  from?: number;
  size?: number;
};

type DollarKuzzleCreateOptions = DollarKuzzleOptions & {
  id?: string;
  replace?: boolean;
};

type DollarKuzzleChangeOptions = DollarKuzzleOptions & {
  replace?: boolean;
};

type WithKuzzleMetadata<R> = R & {
  _kuzzle_info: KuzzleMetadata;
};

type WithKuzzleResponse<R, K> = R & {
  _kuzzle_response: K;
};

export interface DollarKuzzle<V> {
  vm: V;
  readonly queries: Record<string, SmartKuzzle<V>>;
  readonly documents: Record<string, SmartDocument<V>>;
  readonly searches: Record<string, SmartSearch<V>>;
  readonly provider: KuzzleProvider;
  readonly loading: boolean;

  query<R = any>(
    body: object,
    options: DollarKuzzleQueryOptions,
  ): Promise<QueryResponse<R>>;
  get<R = any>(
    id: string,
    options?: DollarKuzzleOptions,
  ): Promise<
    WithKuzzleResponse<WithKuzzleMetadata<R>, KuzzleDocumentGetResponse<R>>
  >;
  search<R = any>(
    query: object,
    options?: DollarKuzzleSearchOptions,
  ): Promise<
    WithKuzzleResponse<WithKuzzleMetadata<R>[], KuzzleDocumentSearchResponse<R>>
  >;
  create<R = any>(
    doc: R,
    options?: DollarKuzzleCreateOptions,
  ): Promise<
    WithKuzzleResponse<
      WithKuzzleMetadata<R>,
      KuzzleDocumentCreateReplaceResponse<R>
    >
  >;
  change<R = any>(
    id: string,
    doc: object,
    options?: DollarKuzzleChangeOptions,
  ): Promise<
    WithKuzzleResponse<
      WithKuzzleMetadata<R>,
      KuzzleDocumentCreateReplaceResponse<R>
    >
  >;
  delete(id: string, options?: DollarKuzzleOptions): Promise<void>;

  addSmartDocumentOrSearch<R = any>(
    key: string,
    options: VueKuzzleDocumentOptions<V, R> | VueKuzzleSearchOptions<V, R>,
  ): SmartDocument<V>;
}
