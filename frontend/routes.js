const _ = require('lodash');
let router = require('express').Router();
let globule = require('globule');
let files = globule.find('resources/pages/*/route.js');
_.each(files, file => {
	router.use(require("./" + file));
});

module.exports = router;
