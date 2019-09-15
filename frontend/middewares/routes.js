const _ = require('lodash');
let router = require('express').Router();
let globule = require('globule');
let files = globule.find('./resources/pages/*/route.js', {absolute: true});
console.log("test", files.length);
_.each(files, file => {
	router.use(require(file));
});
router.use(require("../resources/pages/plp/fallback-route"));

module.exports = router;
