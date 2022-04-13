const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
    target: 'https://traffic.transportdata.tw/MOTC',
    changeOrigin: true
}

module.exports = function(app) {
    app.use(
      '/nptgov',
      createProxyMiddleware(proxy)
    );
  };