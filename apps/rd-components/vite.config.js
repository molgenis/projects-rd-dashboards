import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

import newDevProxy from '../dev-proxy.config.js'
const devProxyConfig = newDevProxy('https://david.gcc.rug.nl/')


const shared = {
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$shared': fileURLToPath(new URL('../rd-shared/', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      modules: {
        
      },
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
  },
}

export default defineConfig(({ command }) => {
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
        proxy: devProxyConfig
      },
      ...shared
    }
  } else {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: path.resolve(__dirname, 'lib/main.js'),
          name: 'rd-components',
          fileName: 'rd-components'
        },
        rollupOptions: {
          external: 'vue',
          output: {
            globals: {
              vue: 'vue'
            },
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'style.css') {
                return 'rd-components.css'
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
