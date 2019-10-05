const credential = require("./credential");
const {Client} = require('elasticsearch');

const connect = () => {

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
    return client;
};

module.exports = {
    connect: connect
};
