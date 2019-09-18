const infoService = require("./services/infoService");

let infoController = async (req, res) => {
	console.time("Prepare data for info");
	let data = await infoService.prepareData();
	console.timeEnd("Prepare data for info");
	return res.render("pages/info/views/info", data);
};

module.exports = infoController;