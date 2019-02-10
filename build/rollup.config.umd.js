import base from './rollup.config.base'

const config = Object.assign({}, base, {
  output: {
    file: 'dist/vue-kuzzle.umd.js',
    format: 'umd',
    name: 'vue-kuzzle',
  },
})

export default config
