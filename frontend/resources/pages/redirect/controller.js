const service = require("./services/viewService");

let controller = async (req, res) => {
	let variantID = req.params.variantID;
	console.time("Prepare data for redirect");
	let data = await service.prepareData(variantID);
	console.timeEnd("Prepare data for redirect");
	return res.render("pages/redirect/views/view", data);
};

module.exports = controller;