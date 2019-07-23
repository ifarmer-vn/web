const css = require("../../../src/css/css");
const homepageService = require("./services/homepageService");

let homepageController = async (req, res) => {
	let data = await homepageService.buildData();
	console.time("Test");

	data.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");
	console.timeEnd("Test");
	return res.render("pages/homepage/views/homepage", data);
};

module.exports = homepageController;