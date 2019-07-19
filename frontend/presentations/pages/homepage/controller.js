const pug = require('pug');
const {resolve} = require("path");
const compiledFunction = pug.compileFile(resolve("presentations/pages/homepage/views/view.pug"));
const homepageService = require("./services/homepageService");

const controller = (req, res) => {
	let data = homepageService.buildData();
	return res.send(compiledFunction(data));
};

module.exports = controller;