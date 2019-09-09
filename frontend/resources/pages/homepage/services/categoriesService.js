const {search} = require("../../../../src/elasticsearch/search");

const searchCategories = search("categories");
const getAllCategories = async () => {

	const data = await searchCategories({
        "_source": [
            "url",
            "name",
            "images.url"
        ],
        "query": {
            "bool": {
                "must_not": {
                    "term": {
                        "hide": true
                    }
                }
            }
        },
        "size": 16,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    });
    return data.hits;
};

const revealed = {
    getAllCategories
};

module.exports = revealed;
