const plpService = require("./services/plpService");

let plpController = async (req, res) => {
	let categoryID = req.params.categoryID;
	console.time("Prepare data for plp");
	let data = await plpService.prepareData(categoryID);
	console.timeEnd("Prepare data for plp");
	return res.render("pages/plp/views/plp", data);
};

module.exports = plpController;