function hasProperty(holder, key) {
  return (
    typeof holder !== 'undefined' &&
    Object.prototype.hasOwnProperty.call(holder, key)
  );
}

function initProvider() {
  const options = this.$options;
  // KuzzleProvider injection
  const optionValue = options.kuzzleProvider;
  if (optionValue) {
    this.$kuzzleProvider =
      typeof optionValue === 'function' ? optionValue() : optionValue;
  } else if (options.parent && options.parent.$kuzzleProvider) {
    this.$kuzzleProvider = options.parent.$kuzzleProvider;
  }
}

function proxyData() {
  this.$_kuzzleInitData = {};

  let kuzzle = this.$options.kuzzle;
  if (kuzzle) {
    // watchQuery
    for (let key in kuzzle) {
      if (key.charAt(0) !== '$') {
        let options = kuzzle[key];
        // Property proxy
        if (
          !options.manual &&
          !hasProperty(this.$options.props, key) &&
          !hasProperty(this.$options.computed, key) &&
          !hasProperty(this.$options.methods, key)
        ) {
          Object.defineProperty(this, key, {
            get: () => this.$data.$kuzzleData.data[key],
            // For component class constructor
            set: value => (this.$_kuzzleInitData[key] = value),
            enumerable: true,
            configurable: true,
          });
        }
      }
    }
  }
}

function launch() {
  const kuzzleProvider = this.$kuzzleProvider;

  if (this._kuzzleLaunched || !kuzzleProvider) return;
  this._kuzzleLaunched = true;

  // Prepare properties
  let kuzzle = this.$options.kuzzle;

  if (kuzzle) {
    this.$_kuzzlePromises = [];

    if (!kuzzle.$init) {
      kuzzle.$init = true;

      // Default options applied to `kuzzle` options
      if (kuzzleProvider.defaultOptions) {
        kuzzle = this.$options.kuzzle = Object.assign(
          {},
          kuzzleProvider.defaultOptions,
          kuzzle,
        );
      }
    }

    defineReactiveSetter(this.$kuzzle, 'client', kuzzle.$client, kuzzle.$deep);
    defineReactiveSetter(self.$kuzzle, 'index', kuzzle.$index, kuzzle.$deep);
    defineReactiveSetter(
      self.$kuzzle,
      'collection',
      kuzzle.$collection,
      kuzzle.$deep,
    );
    defineReactiveSetter(
      this.$kuzzle,
      'loadingKey',
      kuzzle.$loadingKey,
      kuzzle.$deep,
    );
    defineReactiveSetter(this.$kuzzle, 'error', kuzzle.$error, kuzzle.$deep);
    defineReactiveSetter(
      this.$kuzzle,
      'watchLoading',
      kuzzle.$watchLoading,
      kuzzle.$deep,
    );

    // Kuzzle Data
    Object.defineProperty(this, '$kuzzleData', {
      get: () => this.$data.$kuzzleData,
      enumerable: true,
      configurable: true,
    });

    // watchQuery
    for (let key in kuzzle) {
      if (key.charAt(0) !== '$') {
        let options = kuzzle[key];
        const smart = this.$kuzzle.addSmartDocumentOrSearch(key, options);
        if (options.prefetch !== false && kuzzle.$prefetch !== false) {
          this.$_kuzzlePromises.push(smart.firstRun);
        }
      }
    }
  }
}

function defineReactiveSetter($kuzzle, key, value, deep) {
  if (typeof value !== 'undefined') {
    if (typeof value === 'function') {
      $kuzzle.defineReactiveSetter(key, value, deep);
    } else {
      $kuzzle[key] = value;
    }
  }
}

function destroy() {
  if (this.$_kuzzle) {
    this.$_kuzzle.destroy();
    this.$_kuzzle = null;
  }
}

export function installMixin(Vue, vueVersion) {
  Vue.mixin({
    ...(vueVersion === '1'
      ? {
          init: initProvider,
        }
      : {}),

    ...(vueVersion === '2'
      ? {
          data() {
            return {
              $kuzzleData: {
                queries: {},
                loading: 0,
                data: this.$_kuzzleInitData,
              },
            };
          },

          beforeCreate() {
            initProvider.call(this);
            proxyData.call(this);
          },

          serverPrefetch() {
            if (this.$_kuzzlePromises) {
              return Promise.all(this.$_kuzzlePromises);
            }
          },
        }
      : {}),

    created: launch,

    destroyed: destroy,
  });
}
