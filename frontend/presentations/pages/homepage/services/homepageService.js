const homepageModel = require("./models/homepageModel");
const css = require("../../../../src/css/css");
const categories = require("./categories");
let data = require("../data-feed/homepage");
let prepareData = async () => {
	//Todo later should have validator
	data.categories = await categories.getAllCategories();
	data.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");

	homepageModel.data = data;
	// get data from somewhere

	return homepageModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;