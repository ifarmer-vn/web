const homepageModel = require("./models/homepageModel");
let data = require("../data-feed/homepage");
const {search} = require("library");
let buildData = async () => {
	console.log("buildData");
	//Todo later should have validator
	data.categories = await getAllCategories();
	homepageModel.data = data;
	// get data from somewhere

	return homepageModel;
};

const getAllCategories = async () => {
	const data = await search.query("categories_v1")({
		"query": {
			"bool": {
				"must_not": {
					"bool": {
						"should": [
							{
								"match": {
									"hide": true
								}
							}
						]
					}
				}
			}
		}
	});
	return data.hits;
};

const revealed = {
	buildData
};
module.exports = revealed;