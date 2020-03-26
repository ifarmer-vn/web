const service = require("./services/viewService");

let controller = async (req, res) => {
	let variantID = req.params.variantID;
	console.time("Prepare data for order");
	let data = await service.prepareData(variantID);
	console.timeEnd("Prepare data for order");
	return res.render("pages/order/views/view", data);
};

module.exports = controller;