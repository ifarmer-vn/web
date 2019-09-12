const pdpModel = require("./models/adpModel");
const composeData = require("./composeData");
let prepareData = async (articleID) => {
	//Todo later should have validator
	pdpModel.__data = await composeData.getData(articleID);

	return pdpModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;