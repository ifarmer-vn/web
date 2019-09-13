const alpService = require("./services/alpService");

let alpController = async (req, res) => {
	let articleCategoryID = req.params.articleCategoryID;
	console.time("Prepare data for alp");
	let data = await alpService.prepareData(articleCategoryID);
	console.timeEnd("Prepare data for alp");
	return res.render("pages/alp/views/alp", data);
};

module.exports = alpController;