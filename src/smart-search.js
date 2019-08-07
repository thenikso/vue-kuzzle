import SmartKuzzle from './smart-kuzzle';

export default class SmartSearch extends SmartKuzzle {
  constructor(vm, key, options, autostart = true) {
    super(vm, key, options, false);
    this.type = 'search';
  }

  async executeKuzzle() {
    const search = this.options.search;

    try {
      this.response = await this.client.document.search(
        this.index,
        this.collection,
        {
          query: search.query,
          aggregations: search.aggregations,
          sort: search.sort,
        },
        {
          from: search.from || 0,
          size: search.size || 10,
        },
      );
      const data = this.response.hits.map(({ _source }) => _source);
      this.nextResult(data, this.response);
    } catch (error) {
      this.catchError(error);
    }

    super.executeKuzzle();
  }

  get hasMore() {
    return this.response ? this.response.fetched < this.response.total : false;
  }

  async fetchMore() {
    if (!this.response) {
      return;
    }

    try {
      const moreResponse = await this.response.next();
      const fetchMoreData = moreResponse.hits.map(({ _source }) => _source);
      if (fetchMoreData) {
        const data = [...this.getData(), ...fetchMoreData];
        this.nextResult(data, moreResponse);
      }
    } catch (error) {
      this.catchError(error);
    }
  }

  nextResult(data, response) {
    if (typeof this.vm.$kuzzle.provider.afterFetch === 'function') {
      doc = this.vm.$kuzzle.provider.afterFetch.call(
        this.vm,
        data,
        response,
        'search',
      );
    }
    if (typeof this.options.update === 'function') {
      this.setData(this.options.update.call(this.vm, data, response));
    } else {
      this.setData(data);
    }
  }
}
