const adpService = require("./services/adpService");

let adpController = async (req, res) => {
	let articleID = req.params.articleID;
	console.time("Prepare data for adp");

	adpService.prepareData(articleID).then(data => {
		console.timeEnd("Prepare data for adp");
		res.render("pages/adp/views/adp", data);
	}).catch(error => {
		console.error(error.message);
		if (error.message === "Not Found") {
			res.status(404).send(error.message);
		}
	});
};

module.exports = adpController;
