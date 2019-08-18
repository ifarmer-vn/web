const credential = require("./credential");
const {Client} = require('elasticsearch');
const client = new Client({
    host: [
        {
            host: credential.host,
            auth: credential.auth,
            protocol: credential.protocol,
            port: credential.port
        }
    ]
});

module.exports = Object.freeze(client);
