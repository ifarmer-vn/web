const pug = require("pug");
const {resolve} = require("path");
const css = require("../../../src/css/css");
const compiledFunction = pug.compileFile(resolve("presentations/pages/homepage/views/view.pug"));
const homepageService = require("./services/homepageService");
const homepageController = (req, res) => {
	let data = homepageService.buildData();
	console.time("Test");

	data.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");
	console.timeEnd("Test");
	return res.send(compiledFunction(data));
};

module.exports = homepageController;