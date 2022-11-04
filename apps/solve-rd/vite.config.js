import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import newDevProxy from '../dev-proxy.config.js'

const devProxyConfig = newDevProxy('https://solve-rd.gcc.rug.nl/')

const shared = {
  plugins: [vue(), vueJsx()],
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
      base: "",
      server: {
        open: './apptemplate/index.serve.html',
        port: 8080,
        proxy: devProxyConfig
      },
      ...shared
    }
  } else {
    return {
      ...shared
    }
  }
})
