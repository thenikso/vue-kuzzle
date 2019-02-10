# Kuzzle for Vue.js

Integrates [Kuzzle](https://kuzzle.io/) with [Vue](http://vuejs.org/) usign
declarative queries.

This project is heavily inspired (copied) from the excellent [vue-apollo](https://akryum.github.io/vue-apollo/).

## Installation

:warning: This plugin is not yet published to `npm`. Install it with:

```bash
npm install --save git+https://github.com/thenikso/vue-kuzzle.git
```

Then you want to build it by navigating to `node_modules/vue-kuzzle` and
`yarn && yarn build`.

### 1. Kuzzle SDK

You will need to provide a Kuzzle client yourself. Install the
[Kuzzle JS SDK 6.x](https://github.com/kuzzleio/sdk-javascript) with:

```bash
npm install --save kuzzle-sdk@beta
```

In you app, create a `Kuzzle` instance with the desired protocol:

```javascript
import { Kuzzle, WebSocket } from 'kuzzle-sdk';

const kuzzleClient = new Kuzzle(new WebSocket('localhost'));
```

### 2. Install the plugin

```javascript
import Vue from 'vue';
import VueKuzzle from 'vue-kuzzle';

Vue.use(VueKuzzle);
```

### 3. Kuzzle provider

Preare the provider with the client from 1. which will be accessible by
all child components.

```javascript
const kuzzleProvider = new VueKuzzle({
  defaultClient: kuzzleClient,
  defaultIndex: 'myKuzzleIndex',
});
```

Add this provider to your app with the `kuzzleProvider` option:

```javascript
new Vue({
  el: '#app',
  // inject kuzzleProvider here like vue-pollo or vuex
  kuzzleProvider,
  render: h => h(App),
})
```

Everyting is now ready!

## Usage

After installing `vue-kuzzle` in your app, all your components can use
Kuzzle throught the `kuzzle` special option.

### `kuzzle` options

To declare Kuzzle requests in your Vue component, add the `kuzzle` object
in the component options:

```javascript
export default Vue.extends({
  kuzzle: {
    // Kuzzle specific options
  },
});
```

#### Documents

To fetch a single document use the `document` option:

```vue
<template>
  <div>{{ hello }}</div>
</template>

<script>
export default {
  kuzzle: {
    hello: {
      // Specify the collection from which to fetch the document
      collection: 'myKuzzleCollection',
      // Return a document id, here we show how a route pram can be
      // used to dynamically return the id
      document() {
        return this.$route.params.id;
      },
      // We will subscribe to the document, if changes are made the `hello`
      // property will be automatically updated
      subscribe: true,
      // We can manipulate the data returned by Kuzzle
      update(doc, response) {
        const helloDoc = Object.assign({}, doc);
        helloDoc.id = response._id;
        return helloDoc;
      },
    },
  },
}
</script>
```

Let's unpack the definition of the `kuzzle` options:

- `hello` will be the name of the reactive data containing the result of
  the Kuzzle query for the document. You can specify it as an object like
  in the example above, or a function which will be called once and should
  return the option object.
- `collection` is the Kuzzle collection to query. You can specify this here
  or in the `kuzzle` option as `$collection` to be used by all queries in this component; or in the `kuzzleProvider` as `defaultCollection` to be the fallback for all queries.
- `index` is not speicified here but works similar to `collection`. Use it
  to specify which Kuzzle index to query.
- `document` is either a string or a function returning a string
  representing the document id to query from Kuzzle.
- `subscribe` if set to `true` will start a realtime subscription to that
  document id and update the query if changes are detected. Note that the
  subscription will be created only if the selected Kuzzle client protocol
  supports it.
- `update` is a function that can be used to map the values received from
  Kuzzle. Parameters sent to this function are the document data and the
  raw response from the Kuzzle SDK.

Access the query itself with `this.$kuzzle.queries.hello` and the data
as a regular reactive property with `this.hello`.

#### Searches

Similar to a document query, a search query will perform a search via the
Kuzzle SDK. To craete it, use `search` instead of `document` in the
`kuzzle` options:

```vue
<template>
  <div v-for="greet in greetings" :key="greet.id">{{ greet.message }}</div>
</template>

<script>
export default {
  kuzzle: {
    greetings: {
      // Provide or return a search configuration
      search() {
        return {
          // Elasticsearch query
          query: { term: { '_kuzzle_info.author': '<user_id>' } },
          // Elasticsearch aggregations
          aggregations: [ ... ],
          // Elasticsearch sort
          sort: [ ... ],
          // Offset in the first result
          from: 0,
          // Maximum number of first results to return
          size: 10,
        };
      },
      // We can manipulate the data returned by Kuzzle. This time we have
      // a "hits" array as the first parameter
      update(hits, response) {
        const helloDoc = Object.assign({}, doc);
        helloDoc.id = response._id;
        return helloDoc;
      },
    },
  },
}
</script>
```

Similar to the `document` variant you can specify `index`, and
`collection`. Here are the differences:

- `search` must be specified (instead of `document`) as a search
  configuration or a function returning one. The search configuration
  contains (all optionals):
  - `query` the [Elasticsearch query](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html)
  - `aggregations` controls the [Elasticsearch aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-aggregations.html)
  - `sort` specify how results are [sorted](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html)
  - `from` is the offset of the first document to fetch
  - `size` is the maximum number of documents to fetch
- `update` now received the search result hits as it's first parameter;
- `subscribe` is NOT supported yet for searches.

To load the next page you can use `this.$kuzzle.queries.greetings.hasMore`
to see if there are more results and
`this.$kuzzle.queries.greetings.loadMore()` to load more documents. These
documents will be added to the reactive data automatically.

#### Loading state

You can display a loading state thanks to the `$kuzzle.loading` prop:

```vue
<div v-if="$kuzzle.loading">Loading...</div>
```

Or for this specific ping query:

```vue
<div v-if="$kuzzle.queries.hello.loading">Loading...</div>
```

### `$kuzzle`

All the components under the one wich has the `kuzzleProvider` option have
a `$kuzzle` helper available.

With it, you can access the Kuzzle client with
`this.$kuzzle.provider.defaultProvider` or
`this.$kuzzle.provider.clients.<key>` if you are using multiple clients.

Moreover, you have access to APIs to interact with Kuzzle.

#### `addSmartDocumentOrSearch(key, options)`

Is the API used to convert component level `kuzzle` options to reactive
properties.

#### `get(id, options)`

Is a way to get a document from an `id`. Options are:
- `client` (optional) the name of the Kuzzl client to use among those in
  the `kuzzleProvider`. Defaults to `kuzzleProvider.defaultClient`;
- `index` (optional) the name of the target Kuzzle index. Defaults to
  `kuzzleProvider.defaultIndex`;
- `collection` (optional) the name of the target Kuzzle collection.
  Defaults to `kuzzleProvider.defaultCollection`.

These options are used by all following `$kuzzle` APIs plus some extra ones
when specified.

Returns a promise for the fetched document data augmented with a
`_kuzzle_response` containing the full Kuzzle SDK response. This also
applies to the other APIs if not otherwise specified.

#### `search(query, options)`

Searches for documents using a [`query`](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/query-dsl.html). Extra options are:
- `aggregations` (optional) controls the [Elasticsearch aggregation](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-aggregations.html);
- `sort` (optional) specify how results are [sorted](https://www.elastic.co/guide/en/elasticsearch/reference/5.6/search-request-sort.html);
- `from` (optional) is the offset of the first document to fetch;
- `size` (optional) is the maximum number of documents to fetch.

#### `create(content, options)`

Creates a document with the given `content`. Extra options are:
- `id` (optional) the id to give to the new document;
- `reaplce` (optional) if `true` the document will be replaced if already
  existing; otherwise an exception will be thrown.

#### `change(id, content, options)`

Changes the document with the given `id` to have the provided `content`.
Extra options are:
- `id` (optional) the id to give to the new document;
- `reaplce` (optional) if `true` the document will be replaced instead of
  being updated.

#### `delete(id, options)`

Deletes a document with the given `id`.

#### `query(request, options)`

Is a way to access the raw Kuzzle query capabilities. `request` is the
[Kuzzle query request](https://docs-v2.kuzzle.io/sdk-reference/js/6/kuzzle/query/). Extra options are:
- `controller` the name of the target Kuzzle controller;
- `action` the name of the target Kuzzle action;
- `id` (optional) the target id;

Returns the full Kuzzle SDK query response.

## Components

WIP
