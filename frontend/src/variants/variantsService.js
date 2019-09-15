const {search} = require("../elasticsearch/search");

const searchVariant = search("variants");

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
const getProductsByCategory = async (categoryUrl) => {

    const query = {
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "default": {
                                "value": "true"
                            }
                        }

                    },
                    {
                        "term": {
                            "category.keyword": {
                                "value": categoryUrl
                            }
                        }
                    }
                ]
            }
        },
        "size": 20,
        "sort": [
            {
                "impressions": {
                    "order": "desc"
                }
            }
        ]
    };
    const data = await searchVariant(query);
    return data.hits;
};

const getVariant = async (variantUrl) => {

    const query = {
        "_source": [
            "description",
        ],
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
    getVariant,
    getProductsByCategory,
};

module.exports = revealed;