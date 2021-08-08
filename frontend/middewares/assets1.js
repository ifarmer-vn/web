const serveAssets = require("serve-assets");
const path = require('path');
const assets = new serveAssets(
    {
        route: "/images",
        path: path.join(__dirname, '../images'),
        maxAge: '1d',
    }
);

module.exports = assets.middleware;
