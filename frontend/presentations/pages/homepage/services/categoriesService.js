const {search} = require("library");

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
	getAllCategories
};
module.exports = revealed;
