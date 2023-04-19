import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import banner from 'vite-plugin-banner'
import generateFile from 'vite-plugin-generate-file'

import pkgjson from './package.json'
import newDevProxy from '../dev-proxy.config.js'
const devProxyConfig = newDevProxy('https://david.gcc.rug.nl/')

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `
name: ${pkgjson.name}
version: ${pkgjson.version}
build-date: ${buildDate}
`

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

export default defineConfig(({ command, mode }) => {
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
    
    // build demo application
    if (command === 'build' && mode === 'app') {
      return {
        plugins: [
          vue(),
          banner(bannerText),
          generateFile([{
            type: 'json',
            output: 'config.json',
            data: {
              name: pkgjson.name,
              label: pkgjson.name,
              description: pkgjson.description,
              version: pkgjson.version,
              apiDependency: 'v2',
              includeMenuAndFooter: true,
              runtimeOptions: {}
            }
          }])
        ],
        ...shared,
        base: `/plugin/app/${pkgjson.name}/`,
        build: {
          rollupOptions: {
            output: {
              assetFileNames: (assetInfo) => {
                const extension = assetInfo.name.split('.').pop()
                if (/png|jpg|svg/.test(extension)) {
                  return `img/[name].[hash][extname]`
                }
                return `${extension}/[name].[hash][extname]`
              },
              chunkFileNames: 'js/[name].[hash].js',
              entryFileNames: 'js/[name].[hash].js'
            }
          }
        }
      }
    }
    
    // build library
    if (command === 'build' && mode === 'lib') {
      return {
        plugins: [
          vue(),
          banner(bannerText),
          generateFile([{
            type: 'json',
            output: 'config.json',
            data: {
              name: pkgjson.name,
              label: pkgjson.name,
              description: pkgjson.description,
              version: pkgjson.version,
              apiDependency: 'v2',
              includeMenuAndFooter: true,
              runtimeOptions: {}
            }
          }])
        ],
        ...shared,
        base: `/plugin/app/${pkgjson.name}/`,
        build: {
          rollupOptions: {
            output: {
              assetFileNames: (assetInfo) => {
                const extension = assetInfo.name.split('.').pop()
                if (/png|jpg|svg/.test(extension)) {
                  return `img/[name].[hash][extname]`
                }
                return `${extension}/[name].[hash][extname]`
              },
              chunkFileNames: 'js/[name].[hash].js',
              entryFileNames: 'js/[name].[hash].js'
            }
          }
        }
      }
    }
  }
})
