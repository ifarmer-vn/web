const homepageModel = require("./models/homepageModel");
const composeData = require("./composeData");
let prepareData = async () => {
	//Todo later should have validator
	homepageModel.__data = await composeData.getData();

	return homepageModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;