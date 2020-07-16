const pdpService = require("./services/pdpService");

let pdpController = async (req, res,next) => {
	let productID = req.params.productID;
	console.time("Prepare data for pdp");
	let data = await pdpService.prepareData(productID);
	console.timeEnd("Prepare data for pdp");
	return res.render("pages/pdp/views/pdp", data);
};

module.exports = pdpController;