const express = require("express");
const { ip } = require('address');
const {
  createRequestHandler,
} = require("@remix-run/express");

const app = express();

app.use(express.static("public"));

// needs to handle all verbs (GET, POST, etc.)
app.all(
  "*",
  createRequestHandler({
    // `remix build` and `remix dev` output files to a build directory, you need
    // to pass that build to the request handler
    build: require("../build"),

    // return anything you want here to be available as `context` in your
    // loaders and actions. This is where you can bridge the gap between Remix
    // and your server
    getLoadContext(req, res) {
      // console.log(req, res);
      console.log('我是自定义服务器 node：', req.url);
      return {};
    },
  })
);

const port = 3000;
app.listen(port, () => {
  console.log(`http://${ip()}:${port}`);
});
