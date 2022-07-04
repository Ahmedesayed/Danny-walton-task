const express = require("express");
const app = express(),
  bodyParser = require("body-parser"),
  port = 3080,
  cors = require("cors"),
  corsOptions = {
    origin: "*",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  },
  routes = require("./app/routes"),
  path = require('path');

app.use(cors(corsOptions), bodyParser.json(),express.static(path.join(__dirname, '/')));

routes(app);

app.listen(port, () => {
  console.log(`Server listening on the port::${port}`);
});
