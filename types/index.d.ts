import Vue from 'vue';
import { VueKuzzle, DollarKuzzle } from './vue-kuzzle';
import { KuzzleProvider } from './kuzzle-provider';
import { VueKuzzleComponentOption } from './options';

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    kuzzleProvider?: KuzzleProvider;
    kuzzle?: VueKuzzleComponentOption<V>;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $kuzzle: DollarKuzzle<any>;
  }
}

export * from './options';
export * from './useKuzzle';
export default VueKuzzle;
export { KuzzleProvider };
