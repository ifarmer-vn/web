const contactService = require("./services/contactService");

let contactController = async (req, res) => {
	const path = req.originalUrl.replace(/\//g,'');
	console.time("Prepare data for contact");
	let data = await contactService.prepareData(path);
	console.timeEnd("Prepare data for contact");
	return res.render("pages/contact/views/contact", data);
};

module.exports = contactController;