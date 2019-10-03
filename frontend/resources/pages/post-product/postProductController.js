const postProductService = require("./services/postProductService");

let postProductController = async (req, res) => {
	const path = req.originalUrl.replace(/\//g,'');
	console.time("Prepare data for postProduct");
	let data = await postProductService.prepareData(path);
	console.timeEnd("Prepare data for postProduct");
	return res.render("pages/post-product/views/post-product", data);
};

module.exports = postProductController;