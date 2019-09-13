const pdpModel = require("./models/plpModel");
const composeData = require("./composeData");
let prepareData = async (categoryID) => {
	//Todo later should have validator
	pdpModel.__data = await composeData.getData(categoryID);

	return pdpModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;