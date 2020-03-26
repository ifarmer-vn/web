const model = require("./models/model");
const composeData = require("./composeData");
let prepareData = async (variantID) => {
	model.__data = await composeData.getData(variantID);

	return model;
};

const revealed = {
	prepareData
};
module.exports = revealed;
