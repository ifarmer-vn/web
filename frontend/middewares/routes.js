let router = require('express').Router();
let globule = require('globule');
let files = globule.find('./resources/pages/*/route.js', {absolute: true});
console.log("test", files.length);
files.map(file => {
    console.log("file", file);
    router.use(require(file));
});
console.log("file","../resources/pages/plp/fallback-route");

router.use(require("../resources/pages/plp/fallback-route"));

module.exports = router;
