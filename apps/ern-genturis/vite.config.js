import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createHtmlPlugin } from 'vite-plugin-html'
import banner from 'vite-plugin-banner'
import generateFile from 'vite-plugin-generate-file'

import pkgjson from './package.json'
import newDevProxy from '../dev-proxy.config.js'
const devProxyConfig = newDevProxy('https://genturis-acc.molgeniscloud.org/')

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
        banner(bannerText),
        createHtmlPlugin({
          entry: './src/main.js',
          template: './apptemplate/index.build.html'
        }),
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
      base: `/plugin/app/${pkgjson.name}/`,
      ...shared
    }
  }
})
