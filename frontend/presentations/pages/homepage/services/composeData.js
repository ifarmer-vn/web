const css = require("../../../../src/css/css");
const categories = require("./categoriesService");
const R = require("ramda");
let data = require("../data-feed/homepage");

const getData = async () => {
	let result = R.clone(data);
	result.categories = await categories.getAllCategories();
	result.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");
	return result;
};
const revealed = {
	getData
};
module.exports = revealed;