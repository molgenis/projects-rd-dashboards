import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

const PROXY_TARGET = 'https://david.gcc.rug.nl/'

export default defineConfig(({ command }) => {
  const shared = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "src/styles/resets.scss";
          @import "src/styles/palettes.scss";
          @import "src/styles/variables.scss";
          @import "src/styles/padding.scss";
          @import "src/styles/heightwidth.scss";
          @import "src/styles/textPosition.scss";
          `
        }
      }
    }
  }

  if (command === 'serve') {
    return {
      plugins: [vue()],
      resolve: {
        alias: {
          vue: require.resolve("vue/dist/vue.runtime.esm-bundler.js"),
        },
      },
      base: "",
      server: {
        port: 8080,
        proxy: require('../dev-proxy.config.js')
      },
      ...shared
    }
  } else {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'lib/main.js'),
          name: 'rd-ui-components',
          fileName: 'rd-ui-components'
        },
        rollupOptions: {
          external: 'vue',
          output: {
            globals: {
              vue: 'vue'
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') {
                return 'rd-ui-components.css'
              }
              return assetInfo.name
            }
          }
        }
      },
      ...shared
    }
  }
})
