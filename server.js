const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use('/stream', createProxyMiddleware({
  target: 'https://stream-158.zeno.fm', // URL do servidor de áudio original
  changeOrigin: true,
  pathRewrite: {
    '^/stream': '', // Remove '/stream' do caminho
  },
  onProxyReq: (proxyReq, req, res) => {
    proxyReq.setHeader('origin', 'http://localhost:3000'); // Define a origem para bypass CORS
  }
}));

app.listen(3000, () => {
  console.log('Proxy server running on http://localhost:3000');
});
