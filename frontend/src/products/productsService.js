const {search} = require("../elasticsearch/search");

const searchProducts = search("products");

const productSource = [
    "url",
    "name",
    "content",
    "robot",
    "category",
    "title",
];

const getProduct = async (productUrl) => {

	const data = await searchProducts({
        "_source": productSource,
        "query": {
            "match": {
                "url": productUrl
            }
        }
    });
    return data.hits[0];
};

const revealed = {
    getProduct
};

module.exports = revealed;
