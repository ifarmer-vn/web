const postProductService = require("./services/postProductService");

let postProductController = async (req, res) => {
	let variantID = req.params.variantID;


	console.time("Prepare data for postProduct");
	let data = await postProductService.prepareData(variantID);
	console.timeEnd("Prepare data for postProduct");
	return res.render("pages/post-product/views/post-product", data);
};

module.exports = postProductController;
