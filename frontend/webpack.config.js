const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  devServer: {
    allowedHosts: [
      '.localhost', // Add your domain here if you have one
      'all'
    ],
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    },
  },
};
