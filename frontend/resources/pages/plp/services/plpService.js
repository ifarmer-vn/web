const plpModel = require("./models/plpModel");
const composeData = require("./composeData");
let prepareData = async (categoryID) => {
	//Todo later should have validator
	plpModel.__data = await composeData.getData(categoryID);

	return plpModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;