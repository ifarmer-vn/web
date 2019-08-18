const serveAssets = require("serve-assets");
const path = require('path');
const assets = new serveAssets(
    {
        route: "/assets",
        path: path.join(__dirname, '../assets'),
        maxAge: '1d',
    }
);

module.exports = assets.middleware;
