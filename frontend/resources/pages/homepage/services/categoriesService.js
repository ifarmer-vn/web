const {search} = require("../../../../src/elasticsearch/search");

const searchCategories = search("categories");
const getAllCategories = async () => {

	const data = await searchCategories({
        "query": {
            "bool": {
                "must_not": {
                    "term": {
                        "hide": true
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
