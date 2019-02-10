declare module 'kuzzle-sdk' {
  export class Http {
    http: object;

    /**
     * Use this constructor to create a new instance of the Http protocol with specific options.
     * @param host - 	Kuzzle server hostname or IP
     * @param options - Http connection options
     */
    constructor(
      host: string,
      options?: {
        // Kuzzle server port
        port?: number;
        // Use SSL to connect to Kuzzle server
        sslConnection?: boolean = false;
      },
    );
  }

  export class WebSocket {
    constructor(
      host: string,
      options?: {
        // Kuzzle server port
        port: number = 7512;
        // Use SSL to connect to Kuzzle server
        sslConnection: boolean = false;
        // Automatically reconnect to kuzzle after a `disconnected` event
        autoReconnect: boolean = true;
        // Number of milliseconds between reconnection attempts
        reconnectionDelay: number = 1000;
      },
    );
  }

  type Protocol = Http | WebSocket;

  export class Kuzzle {
    /**
     * Use this constructor to create a new instance of the SDK.
     * Each instance represent a different connection to a Kuzzle server with specific options.
     * @constructor
     * @param protocol - Protocol used by the SDK instance
     * @param options - Kuzzle object configuration
     */
    constructor(
      protocol: Protocol,
      options?: {
        // Automatically queue all requests during offline mode
        autoQueue: boolean = false;
        // Automatically replay queued requests on a `reconnected` event
        autoReplay: boolean = false;
        // Automatically renew all subscriptions on a `reconnected` event
        autoResubscribe: boolean = true;
        // Time (in ms) during which a similar event is ignored
        eventTimeout: number = 200;
        // Offline mode configuration. Can be manual or auto
        offlineMode: string = 'manual';
        // Time a queued request is kept during offline mode, in milliseconds
        queueTTL: number = 120000;
        // Number of maximum requests kept during offline mode
        queueMaxSize: number = 500;
        // Delay between each replayed requests, in milliseconds
        replayInterval: number = 10;
        // Common volatile data, will be sent to all future requests
        volatile: object = {};
      },
    );

    /**
     * The JWT token to be used to authenticate requests.
     */
    jwt: string | null | undefined;

    /**
     * The Protocol used to connect to the server
     */
    protocol: Protocol;

    // Connects to Kuzzle using the host property provided in the constructor options.
    // Subsequent call have no effect if the SDK is already connected.
    connect(): Promise<void>;

    // Closes the current connection to Kuzzle. The SDK then enters the `offline` state.
    // A call to `disconnect()` will not trigger a `disconnected` event.
    // This event is only triggered on unexpected disconnection.
    disconnect(): Promise<void>;

    /**
     * Base method used to send queries to Kuzzle, following the
     * [API Documentation](https://docs-v2.kuzzle.io/api/1).
     * @param request - API request options
     * @param options - Optional query options
     */
    query(
      request: QueryRequest,
      options?: QueryOptions,
    ): Promise<QueryResponse>;

    auth: {
      // Checks a token validity.
      // This API route does not require the caller to be logged in.
      checkToken(token: string): Promise<{ valid: boolean; expiresAt: number }>;

      // Authenticates a user.
      login(
        // Name of the strategy to use. Try 'local'.
        strategy: string,
        // Credentials for the strategy. Depends on the authentication strategy.
        // For `local` strategy use { username, password }
        credentials: object,
        // Expiration time in [ms library](https://www.npmjs.com/package/ms) format. (e.g. 2h)
        expiresIn: string,
      ): Promise<string>;

      // Revokes the user's authentication token.
      // If there were any, real-time subscriptions are cancelled.
      logout(): Promise<void>;

      // Returns information about the currently logged in user.
      getCurrentUser(options?: QueryOptions): Promise<KuzzleUser>;
    };

    document: {
      // Gets a document.
      get<T>(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Document ID
        id: string,
        // Query options
        options?: QueryOptions,
      ): Promise<KuzzleDocumentGetResponse<T>>;

      /**
       * Creates a new document in the persistent data storage.
       *
       * Throws an error if the document already exists.
       *
       * The optional parameter `refresh` can be used with the value `wait_for`
       * in order to wait for the document to be indexed
       * (indexed documents are available for `search`).
       * @param {string} index - Index name
       * @param {string} collection - Collection name
       * @param {object} document - Document content
       * @param {string} id - Optional document ID
       * @param {RefreshQueryOptions} options - Query options
       */
      create(
        index: string,
        collection: string,
        document: object,
        id?: string,
        options?: RefreshQueryOptions,
      ): Promise<KuzzleDocumentCreateReplaceResponse>;

      /**
       * Creates a new document in the persistent data storage, or replaces its content if it already exists.
       *
       * The optional parameter `refresh` can be used with the value `wait_for`
       * in order to wait for the document to be indexed
       * (indexed documents are available for `search`).
       * @param {string} index - Index name
       * @param {string} collection - Collection name
       * @param {object} document - Document content
       * @param {string} id - Optional document ID
       * @param {RefreshQueryOptions} options - Query options
       */
      createOrReplace(
        index: string,
        collection: string,
        id: string,
        document: object,
        options?: RefreshQueryOptions,
      ): Promise<KuzzleDocumentCreateReplaceResponse>;

      // Updates a document content.
      update(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Document ID
        id: string,
        // Partial content of the document to update
        document: object,
        // Query options
        options?: UpdateOptions,
      ): Promise<KuzzleDocumentUpdateResponse>;

      // Replaces the content of an existing document.
      replace(
        // Index name
        index: string,
        // Collection name
        collection: string,
        id: string,
        // Partial content of the document to update
        document: object,
        // Query options
        options?: RefreshQueryOptions,
      ): Promise<KuzzleDocumentCreateReplaceResponse>;

      // Searches documents
      search<T>(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Search query
        query: {
          // the search query itself, using the ElasticSearch Query DSL syntax.
          // https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html
          query?: object;
          // https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-aggregations.html
          aggregations?: object;
          // https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html
          sort?: object[];
        },
        // Query options
        options?: SearchOptions,
      ): Promise<KuzzleDocumentSearchResponse<T>>;

      /**
       * Deletes a document.
       *
       * The optional parameter `refresh` can be used with the value `wait_for`
       * in order to wait for the document to be indexed (and to no longer be
       * available in search).
       * @param index - Index name
       * @param collection - Collection name
       * @param id - Document ID
       * @param options - Query options
       * @returns Resolves to the id of the deleted document.
       */
      delete(
        index: string,
        collection: string,
        id: string,
        options?: RefreshQueryOptions,
      ): Promise<string>;

      // Gets multiple documents.
      // Throws a partial error (error code 206) if one or more document can not be retrieved.
      mGet(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Document ids
        ids: string[],
        // Query options
        options?: QueryOptions,
      ): Promise<KuzzleDocumentMGetResponse>;

      // Updates multiple documents.
      // Returns a partial error (error code 206) if one or more documents can not be updated.
      mUpdate(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Array of documents to update
        documents: ({ _id: string; body: object })[],
        // Query options
        options?: UpdateOptions,
      ): Promise<KuzzleDocumentMUpdateResponse>;
    };

    realtime: {
      // Sends a real-time message to Kuzzle. The message will be dispatched to all clients with subscriptions matching the index, the collection and the message content.
      // The index and collection are indicative and serve only to distinguish the rooms. They are not required to exist in the database
      // Note: real-time messages are not persisted in the database.
      publish(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Message to send
        message: string,
        // Query options
        options?: QueryOptions,
      ): Promise<void>;

      // Subscribes by providing a set of filters: messages, document changes and,
      // optionally, user events matching the provided filters will generate
      // [real-time notifications](https://docs-v2.kuzzle.io/api/1/essentials/real-time),
      // sent to you in real-time by Kuzzle.
      subscribe(
        // Index name
        index: string,
        // Collection name
        collection: string,
        // Set of filters following Koncorde syntax
        fitlers: object,
        // Callback function to handle notifications
        callback: (notification: KuzzleNotification) => void,
        // Query options
        options?: {
          // Subscribe to document entering or leaving the scope
          scope?: KuzzleScope = 'all';
          // Subscribe to users entering or leaving the room
          users?: KuzzleScope = 'none';
          // Subscribe to notifications fired by our own queries
          subscribeToSelf?: boolean = true;
          // subscription information, used in user
          // [join/leave notifications](https://docs-v2.kuzzle.io/api/1/essentials/volatile-data/)
          volatile?: object | null = null;
        },
      ): Promise<string>;

      // Removes a subscription.
      unsubscribe(
        // Subscription room ID
        roomId: string,
        // Query options
        options?: QueryOptions,
      ): Promise<void>;
    };
  }

  export type QueryRequest = {
    controller: string;
    action: string;
    index?: string;
    collection?: string;
    _id?: string;
    refresh?: 'wait_for' | '';
    body?: any;
  };

  export type QueryResponse<R = any> = {
    requestId: string;
    status: number;
    error: string | null;
    controller: string;
    action: string;
    index: string | null;
    collection: string | null;
    volatile: any;
    room: string;
    result: R;
  };

  export type QueryOptions = {
    // If true, queues the request during downtime, until connected to Kuzzle again.
    queuable?: boolean = true;
  };

  export type RefreshQueryOptions = QueryOptions & {
    // If set to `wait_for`, waits for the change to be reflected for `search` (up to 1s)
    refresh?: '' | 'wait_for' = '';
  };

  export type UpdateOptions = RefreshQueryOptions & {
    // The number of times the database layer should retry in case of version conflict
    retryOnConflict?: number = 0;
  };

  export type SearchOptions = QueryOptions & {
    // Offset of the first document to fetch
    from?: number = 0;
    // Maximum number of documents to retrieve per page
    size?: number = 10;
    // When set, gets a forward-only cursor having its ttl set to the given value
    // ie: `30s`; cf https://www.elastic.co/guide/en/elasticsearch/reference/5.6/common-options.html#time-units
    scroll?: string = '';
  };

  export interface KuzzleMetadata {
    // The unique identifier of the user who created the document.
    author: string;
    // Timestamp of document creation (create or replace), in epoch-milliseconds format.
    createdAt: number;
    // Timestamp of last document update in epoch-milliseconds format,
    // or `null` if no update has been made.
    updatedAt: number | null;
    // The unique identifier of the user that updated the document,
    // or `null` if the document has never been updated.
    updater: string | null;
    // The status of the document. `true` if the document is active and
    // `false` if the document has been put in the trashcan.
    active: boolean;
    // Timestamp of document deletion in epoch-milliseconds format,
    // or `null` if the document has not been deleted.
    deletedAt: number | null;
  }

  type Source<Body = {}> = Body & {
    _kuzzle_info: KuzzleMetadata;
  };

  export interface KuzzleUser<Info = {}> {
    _id: string;
    content: Source<Info> & {
      profileIds: string[];
    };
    meta: KuzzleMetadata;
  }

  export interface KuzzleDocument<Body = {}> {
    _id: string;
    _meta: KuzzleMetadata;
    _source: Source<Body>;
  }

  export interface KuzzleDocumentGetResponse<Body = {}>
    extends KuzzleDocument<Body> {
    found: boolean;
    _index: string;
    _type: string;
    _version: number;
  }

  export abstract interface KuzzleMResponse<T> {
    total: number;
    hits: T[];
  }

  export interface KuzzleDocumentMGetResponse<Body = {}>
    extends KuzzleMResponse<KuzzleDocument<Body>> {}

  export interface KuzzleDocumentUpdateResponse {
    _index: string;
    _type: string;
    _version: number;
    _id: string;
    _shards: { total: number; successful: number; failed: number };
    result: string;
  }

  export interface KuzzleDocumentCreateReplaceResponse<Body = {}>
    extends KuzzleDocumentUpdateResponse {
    _source: Source<Body>;
    created: boolean;
  }

  export interface KuzzleDocumentMUpdateResponse
    extends KuzzleMResponse<KuzzleDocumentUpdateResponse> {}

  export interface KuzzleDocumentSearchResponse<Body = {}> {
    // Search aggregations if any
    aggregations: object;
    // Array containing the retrieved items for the current page
    hits: {
      _id: string;
      _score: number;
      _source: Source<Body>;
    }[];
    // Total number of items matching the given query in Kuzzle database
    total: number;
    // Number of retrieved items so far
    fetched: number;
    // Scroll identifier if the search was given a scroll parameter
    scroll_id: string;
    // Load more results
    next(): Promise<KuzzleDocumentSearchResponse<Body>>;
  }

  export type KuzzleScope = 'all' | 'in' | 'out' | 'none';

  export interface KuzzleNotification<Body = {}> {
    status: number;
    requestId: string;
    timestamp: number;
    volatile: object | null;
    index: string;
    collection: string;
    controller: string;
    action: string;
    protocol: string;
    scope: KuzzleScope;
    state: string;
    type: string;
    room: string;
    result: KuzzleDocument;
  }
}
