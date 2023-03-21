import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import banner from 'vite-plugin-banner'
import generateFile from 'vite-plugin-generate-file'

import pkgjson from './package.json'
import newDevProxy from '../dev-proxy.config.js'
const devProxyConfig = newDevProxy('https://cosas-acc.molgeniscloud.org/')

const now = new Date()
const buildDate = now.toUTCString()
const bannerText = `
name: ${pkgjson.name}
version: ${pkgjson.version}
build-date: ${buildDate}
`

const shared = {
  define: {
    appversion: JSON.stringify(pkgjson.version)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '$shared': fileURLToPath(new URL('../rd-shared/', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "../../rd-components/src/styles/palettes.scss";
        @import "../../rd-components/src/styles/variables.scss";
        @import "../../rd-shared/styles/mixins.scss";
        `
      }
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
      plugins: [vue()],
      base: "",
      server: {
        port: 8080,
        proxy: devProxyConfig
      },
      ...shared
    }
  } else {
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
})
