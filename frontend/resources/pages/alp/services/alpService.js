const pdpModel = require("./models/alpModel");
const composeData = require("./composeData");
let prepareData = async (articleCategoryID) => {
	//Todo later should have validator
	pdpModel.__data = await composeData.getData(articleCategoryID);

	return pdpModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;