const express = require('express');
const server = express();
const port = 3000;
const routes = require("./routes");

// server.get('/', (req, res) => res.send('Hello World!'))

server.use(routes);


server.listen(port, () => console.log(`Example app listening on port ${port}!`));