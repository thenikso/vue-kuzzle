import { DollarKuzzle } from './dollar-kuzzle';
import { KuzzleProvider as plugin } from './kuzzle-provider';

// import CKuzzleQuery from './components/KuzzleQuery';
// import CKuzzleSubscribeToMore from './components/KuzzleSubscribeToMore';
// import CKuzzleMutation from './components/KuzzleMutation';

import { installMixin } from './mixin';

export { useKuzzle } from './use-kuzzle';

export function install(Vue, options) {
  if (install.installed) return;
  install.installed = true;

  const vueVersion = Vue.version.substr(0, Vue.version.indexOf('.'));

  // Lazy creation
  Object.defineProperty(Vue.prototype, '$kuzzle', {
    get() {
      if (!this.$_kuzzle) {
        this.$_kuzzle = new DollarKuzzle(this);
      }
      return this.$_kuzzle;
    },
  });

  installMixin(Vue, vueVersion);

  if (vueVersion === '2') {
    // Vue.component('kuzzle-query', CKuzzleQuery);
    // Vue.component('KuzzleQuery', CKuzzleQuery);
    // Vue.component('kuzzle-subscribe-to-more', CKuzzleSubscribeToMore);
    // Vue.component('KuzzleSubscribeToMore', CKuzzleSubscribeToMore);
    // Vue.component('kuzzle-mutation', CKuzzleMutation);
    // Vue.component('KuzzleMutation', CKuzzleMutation);
  }
}

plugin.install = install;

// Kuzzle provider
export const KuzzleProvider = plugin;

// Components
// export const KuzzleQuery = CKuzzleQuery;
// export const KuzzleSubscribeToMore = CKuzzleSubscribeToMore;
// export const KuzzleMutation = CKuzzleMutation;

// Auto-install
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

export default plugin;
