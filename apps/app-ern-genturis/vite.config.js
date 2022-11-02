import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import zipPack from 'vite-plugin-zip-pack'
import generateFile from 'vite-plugin-generate-file'

import pkgjson from './package.json'
import newDevProxy from '../dev-proxy.config.js'
const devProxyConfig = newDevProxy('https://genturis-acc.molgeniscloud.org/')

const shared = {
  define: {
    appversion: JSON.stringify(pkgjson.version)
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @import "../../rd-ui-components/src/styles/palettes.scss";
        @import "../../rd-ui-components/src/styles/variables.scss";
        @import "./src/styles/variables.scss";
        @import "./src/styles/mixins.scss";
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
        }]),
        zipPack({
          outFileName: `${pkgjson.name}.v${pkgjson.version}.zip`
        })
      ],
      ...shared
    }
  }
})
