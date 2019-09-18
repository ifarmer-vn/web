const infoModel = require("./models/infoModel");
const composeData = require("./composeData");
let prepareData = async () => {
	//Todo later should have validator
	infoModel.__data = await composeData.getData();

	return infoModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;