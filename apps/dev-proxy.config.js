export default newDevProxy = (host) => {
  const opts = { changeOrigin: true, secure: false }
  const endpoints = [
    '^/login',
    '/api',
    '/js',
    '/img',
    '/logo',
    '/fonts',
    '/theme',
    '/app-ui-context',
    '/logout'
  ]
  const config = {}
  endpoints.forEach(endpoint => config[endpoint] = { target: host, ...opts})
  return config
}