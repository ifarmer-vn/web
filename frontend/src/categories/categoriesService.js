const {search} = require("../elasticsearch/search");

const searchCategories = search("categories");

const nameIndex = "categories_v1";
const getName = () => nameIndex;
const getCategories = (size = 20) => {
    return {
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
        "size": size,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};

const getAllCategories = async () => {
    const query = {
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
        "size": 10000,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
    const data = await searchCategories(query);
    return data.hits;
};
const getCategory = (categoryUrl) => {
    return {
        "query": {
            "term": {
                "url": {
                    "value": categoryUrl
                }
            }
        },
    }
};

const revealed = {
    getCategories,
    getCategory,
    getAllCategories,
    getName
};

module.exports = revealed;
