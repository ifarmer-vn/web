const express = require('express');
const server = express();
const port = 3000;
const routes = require("./routes");

server.set('views', "presentations");
server.set('view engine', 'ejs');

server.use(routes);


server.listen(port, () => console.log(`Ready on http://localhost:${port}!`));