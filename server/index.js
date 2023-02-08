const express = require('express');
const { ip } = require('address');
const { createRequestHandler } = require('@remix-run/express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

app.use(express.static('public'));

app.use('/api', createProxyMiddleware({ target: 'http://t.bomman.com', changeOrigin: true }));

// needs to handle all verbs (GET, POST, etc.)
app.all(
  '*',
  createRequestHandler({
    mode: process.env.NODE_ENV,
    build: require('../build'),
    // return anything you want here to be available as `context` in your
    // loaders and actions. This is where you can bridge the gap between Remix
    // and your server
    getLoadContext(req, res) {
      // console.log(req, res);
      console.log('我是自定义服务器 11 node：', req.url);
      return {};
    },
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://${ip()}:${port}`);
});
