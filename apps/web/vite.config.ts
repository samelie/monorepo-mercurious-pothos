// import '@you/env'
import { defineAppConfig } from '@you/publish'
import vue from '@vitejs/plugin-vue'

export default defineAppConfig({
  plugins: [vue()],
  // resolve: {
  //   alias: {
  //     path: 'rollup-plugin-node-polyfills/polyfills/path',
  //     url: 'rollup-plugin-node-polyfills/polyfills/url',
  //     module: 'rollup-plugin-node-polyfills/polyfills/module',
  //   },
  // },
})
