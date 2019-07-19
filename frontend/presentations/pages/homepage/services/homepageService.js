const homepageModel = require("./models/homepageModel");
const data = require("../data-feed/homepage");
const buildData = () => {
		// get data from somewhere
	homepageModel.data = data;
	//Todo later should have validator

	return homepageModel;
};

const revealed = {
	buildData
};
module.exports = revealed;