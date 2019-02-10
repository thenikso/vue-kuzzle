import Vue from 'vue';
import { DollarKuzzle } from './vue-kuzzle';
import { VueKuzzleComponentOption } from './options';
import { KuzzleProvider } from './kuzzle-provider';

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
