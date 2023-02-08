const express = require('express');
const path = require("path");
const { ip } = require('address');
const app = express()


app.use(express.static(path.join(__dirname, 'public')));

app.listen(8900, () => {
  console.log(`http://${ip()}:8900`);
});

