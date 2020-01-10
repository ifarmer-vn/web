const pdpModel = require("./models/pdpModel");
const composeData = require("./composeData");
let prepareData = async (productID) => {
	//Todo later should have validator
	pdpModel.__data = await composeData.getData(productID);

	return pdpModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;
