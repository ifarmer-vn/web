const plpModel = require("./models/plpModel");
const composeData = require("./composeDataSearch");
let prepareData = async (term) => {
	//Todo later should have validator
	plpModel.__data = await composeData.getData(term);

	return plpModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;