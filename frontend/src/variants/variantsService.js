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
        ],
        "must": [
            {
                "term": {
                    "default": {
                        "value": true
                    }
                }
            },
        ]
    }
};
const getTopProducts = (size = 20) => {

    return {
        "_source": [
            "url",
            "content",
            "robot",
            "category",
            "title",
            "price",
            "extraTitle",
            "name",
            "categorySource",
            "productSource",
            "images.url"
        ],
        "size": size,
        "query": defaultVariantQuery,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};
const getNewProducts = (size = 20) => {

    return {
        "_source": [
            "url",
            "content",
            "robot",
            "category",
            "title",
            "price",
            "extraTitle",
            "name",
            "categorySource",
            "productSource",
            "images.url"
        ],
        "size": size,
        "query": defaultVariantQuery,
        "sort": {
            "updatedAt": {
                "order": "desc"
            }
        }
    };
};

const getVariantsByProduct = (productUrl) => {
    return {
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
};

const getRelatedProductsByCategory = (categoryUrl, productUrl, size = 20) => {

    return {
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
};

const getProductsByCategory = (categoryUrl, size) => {
    return {
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
                "must": [
                    {
                        "term": {
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
const getVariant = (variantUrl) => {

    return {
        "query": {
            "term": {
                "url": variantUrl
            }
        },
    };
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
