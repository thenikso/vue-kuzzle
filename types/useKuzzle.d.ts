import {
  Kuzzle,
  QueryResponse,
  KuzzleMetadata,
  KuzzleDocumentGetResponse,
  KuzzleDocumentSearchResponse,
  KuzzleDocumentCreateReplaceResponse,
} from 'kuzzle-sdk';
import {
  DollarKuzzleOptions,
  DollarKuzzleQueryOptions,
  DollarKuzzleSearchOptions,
  DollarKuzzleCreateOptions,
  DollarKuzzleChangeOptions,
  WithKuzzleResponse,
  WithKuzzleMetadata,
} from './vue-kuzzle';
import { KuzzleProvider } from './kuzzle-provider';
import { Wrapper } from 'vue-function-api';
import { VueKuzzleDocumentOptions, VueKuzzleSearchOptions } from './options';

export type UseKuzzleConfig = {
  provider?: KuzzleProvider;
  client?: string | Kuzzle;
  index?: string;
  collection?: string;
};

interface UseKuzzle {
  provider: KuzzleProvider;
  getClient(options?: { client?: string | Kuzzle }): Kuzzle;
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
  // addSmartDocumentOrSearch<R = any>(
  //   key: string,
  //   options: VueKuzzleDocumentOptions<V, R> | VueKuzzleSearchOptions<V, R>,
  // ): SmartDocument<V>;
}

export function useKuzzle(config?: UseKuzzleConfig): UseKuzzle;

export function fetchKuzzle<R = any>(
  options: VueKuzzleDocumentOptions<never, R>,
): {
  kuzzle: UseKuzzle;
  isReading: Wrapper<boolean>;
  isWriting: Wrapper<boolean>;
  isLoading: Wrapper<boolean>;
  data: Wrapper<R>;
  error: Wrapper<Error>;
  change: (newDoc: R) => Promise<R>;
};

export function searchKuzzle<R = any>(
  options: VueKuzzleSearchOptions<never, R>,
): {
  kuzzle: UseKuzzle;
  isLoading: Wrapper<boolean>;
  data: Wrapper<R[]>;
  error: Wrapper<Error>;
  hasMore: Wrapper<boolean>;
  fetchMore: () => Promise<R[] | undefined>;
  refresh: () => Promise<void>
};
