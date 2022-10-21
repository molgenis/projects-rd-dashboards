const PROXY_TARGET = process.env.MOLGENIS_APPS_HOST || 'https://david.gcc.rug.nl/'

const opts = { changeOrigin: true }

module.exports = {
  '^/login': {
    target: PROXY_TARGET,
    ...opts
  },
  '/api': {
    target: PROXY_TARGET,
    ...opts
  },
  '/js': {
    target: PROXY_TARGET,
    ...opts
  },
  '/img': {
    target: PROXY_TARGET,
    ...opts
  },
  '/logo': {
    target: PROXY_TARGET,
    ...opts
  },
  '/fonts': {
    target: PROXY_TARGET,
    ...opts
  },
  '/theme': {
    target: PROXY_TARGET,
    ...opts
  },
  '/app-ui-context': {
    target: PROXY_TARGET,
    ...opts
  },
  '/logout': {
    target: PROXY_TARGET,
    ...opts
  }
};
