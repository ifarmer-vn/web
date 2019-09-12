const adpService = require("./services/adpService");

let adpController = async (req, res) => {
	let articleID = req.params.articleID;
	console.time("Prepare data for adp");
	let data = await adpService.prepareData(articleID);
	console.timeEnd("Prepare data for adp");
	return res.render("pages/adp/views/adp", data);
};

module.exports = adpController;