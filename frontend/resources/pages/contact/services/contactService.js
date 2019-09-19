const contactModel = require("./models/contactModel");
const composeData = require("./composeData");
let prepareData = async (path) => {
	//Todo later should have validator
	contactModel.__data = await composeData.getData(path);
	return contactModel;
};

const revealed = {
	prepareData
};
module.exports = revealed;
