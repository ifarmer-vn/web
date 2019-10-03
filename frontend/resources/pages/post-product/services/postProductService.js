const postProductModel = require("./models/postProductModel");
const composeData = require("./composeData");
let prepareData = async (path) => {
	//Todo later should have validator
	postProductModel.__data = await composeData.getData(path);
	return postProductModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;
