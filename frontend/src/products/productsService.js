const productSource = [
    "url",
    "name",
    "content",
    "robot",
    "category",
    "title",
];

const getProduct = (productUrl) => {
    return {
        "_source": productSource,
        "query": {
            "match": {
                "url": productUrl
            }
        }
    };
};

const revealed = {
    getProduct
};

module.exports = revealed;
