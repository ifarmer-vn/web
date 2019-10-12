const {search} = require("../elasticsearch/search");

const searchVariant = search("variants");

const defaultVariantQuery = {
    "bool": {
        "must_not": [
            {
                "term": {
                    "hide": true
                }
            },
            {
                "term": {
                    "category" : ""
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
            },
            {
                "exists": {
                    "field": "category"
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
        "size": 100,
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "product": {
                                "value": productUrl
                            }
                        }
                    }
                ]
            }
        }
    };
    const data = await searchVariant(query);
    return data.hits;
};
const getRelatedProductsByCategory = async (categoryUrl, productUrl, size) => {

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
                ],
                "must_not": [
                    {
                        "term": {
                            "product": productUrl
                        }
                    }
                ]
            }
        },
        "size": size || 20,
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
const getProductsByCategory = async (categoryUrl, size) => {

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
                            "category": {
                                "value": categoryUrl
                            }
                        }
                    }
                ]
            }
        },
        "size": size || 20,
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
const searchProductsByQuery = async (term, minimum_should_match, size) => {
    minimum_should_match = minimum_should_match || "100%";
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
                        "nested": {
                            "path": "productSource",
                            "query": {
                                "bool": {
                                    "must": [
                                        {
                                            "match": {
                                                "productSource.title": {
                                                    "query": term,
                                                    "minimum_should_match": minimum_should_match
                                                }

                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    }
                ]
            }
        },
        "size": size || 20,
        "sort": [
            {
                "impressions": {
                    "order": "desc"
                }
            }
        ]
    };
    console.log(JSON.stringify(query));
    const data = await searchVariant(query);
    return data.hits;
};

const getAllVariantsCategory = async (categoryUrl) => {

    const query = {
        "query": {
            "bool": {
                "must_not": [
                    {
                        "term": {
                            "hide": true
                        }
                    },
                ],
                "must":[
                    {
                        "term":{
                            "category": categoryUrl
                        }
                    }
                ]
            }
        },
        "size": 10000,
    };
    const data = await searchVariant(query);
    return data.hits;
};
const getVariant = async (variantUrl) => {

    const query = {
        "query": {
            "term": {
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
    searchProductsByQuery,
    getRelatedProductsByCategory,
    getAllVariantsCategory,
};

module.exports = revealed;
