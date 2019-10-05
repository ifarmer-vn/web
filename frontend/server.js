require('events').EventEmitter.defaultMaxListeners = 100;
const express = require('express');
const utils = require('./src/utils');
const server = express();
const port = 3000;
const routes = require("./middewares/routes");
const assets = require("./middewares/assets");

server.set('views', "resources");
server.set('view engine', 'ejs');

server.use(assets);

server.use(routes);

server.listen(port, () => console.log(`Ready on http://localhost:${port}!`));
