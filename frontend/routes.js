const _ = require('lodash');
let router = require('express').Router();
let globule = require('globule');
let files = globule.find('views/pages/*/route.js');
_.each(files, file => {
	router.use(require("./" + file));
});
// router.use(require("./views/pages/category/fallback-route"));


module.exports = router;