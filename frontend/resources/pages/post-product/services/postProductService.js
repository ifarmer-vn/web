const postProductModel = require("./models/postProductModel");
const composeData = require("./composeData");
let prepareData = async (variantID) => {
	//Todo later should have validator
	postProductModel.__data = await composeData.getData(variantID);
	return postProductModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;
