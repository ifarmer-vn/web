const {search} = require("../elasticsearch/search");

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
const getCategory = async (categoryUrl) => {

    const data = await searchCategories({
        "query": {
            "term": {
                "url": {
                    "value": categoryUrl
                }
            }
        },
    });
    return data.hits[0];
};

const revealed = {
    getAllCategories,
    getCategory
};

module.exports = revealed;
