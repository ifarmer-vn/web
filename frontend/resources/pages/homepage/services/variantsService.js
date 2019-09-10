const {search} = require("../../../../src/elasticsearch/search");

const searchVariant = search("variants");

const variantSource = [
    "url",
    "impressions",
    "price",
    "images.url",
    "productSource",
    "title",
    "extraTitle",
    "variantTypes"
];
const defaultVariantQuery = {
    "bool": {
        "must_not": [
            {
                "term": {
                    "hide": true
                }
            }
        ],
        "must": [
            {
                "term": {
                    "default": {
                        "value": true
                    }
                }
            }
        ]
    }
};
const getTopProducts = async () => {

    const query = {
        "_source": variantSource,
        "size": 20,
        "query": defaultVariantQuery,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
    const data = await searchVariant(query);
    return data.hits;
};
const getNewProducts = async () => {

    const query = {
        "_source": variantSource,
        "size": 20,
        "query": defaultVariantQuery,
        "sort": {
            "updatedAt": {
                "order": "desc"
            }
        }
    };
    const data = await searchVariant(query);
    return data.hits;
};

const getVariantsByProduct = async (productUrl) => {

    const query = {
        "_source": variantSource,
        "size": 20,
        "query": {
            "nested": {
                "path": "productSource",
                "query": {
                    "bool": {
                        "must": [
                            {
                                "term": {
                                    "productSource.url.keyword": {
                                        "value": productUrl
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        },
        "sort": {
            "updatedAt": {
                "order": "desc"
            }
        }
    };
    const data = await searchVariant(query);
    return data.hits;
};

const getVariant = async (variantUrl) => {

    const query = {
        "_source": variantSource,
        "query": {
            "match": {
                "url": variantUrl
            }
        },
    };
    const data = await searchVariant(query);
    return data.hits[0];
};


const revealed = {
    getTopProducts,
    getNewProducts,
    getVariantsByProduct,
    getVariant
};

module.exports = revealed;
