const homepageService = require("./services/homepageService");

let homepageController = async (req, res) => {
	console.time("Prepare data for homepage");
	let data = await homepageService.prepareData();
	console.timeEnd("Prepare data for homepage");
	return res.render("pages/homepage/views/homepage", data);
};

module.exports = homepageController;