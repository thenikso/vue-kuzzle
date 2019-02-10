import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-kuzzle.esm.js',
    format: 'es',
    name: 'vue-kuzzle',
  },
})

export default config
