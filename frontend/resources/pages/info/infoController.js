const infoService = require("./services/infoService");

let infoController = async (req, res) => {
	const path = req.originalUrl.replace(/\//g,'');
	console.time("Prepare data for info");
	let data = await infoService.prepareData(path);
	console.timeEnd("Prepare data for info");
	return res.render("pages/info/views/info", data);
};

module.exports = infoController;