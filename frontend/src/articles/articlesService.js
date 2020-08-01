const {search} = require("../elasticsearch/search");

const searchArticles = search("articles");


const defaultArticleQuery = {
    "bool": {
        "must_not": [
            {
                "term": {
                    "hide": true
                }
            }
        ],
    }
};

const getTopArticles = (size = 20) => {
    return {
        "_source": [
            "url",
            "name",
            "author",
            "updatedAt",
            "title",
            "images",
            "transformedImages",
        ],
        "size": size,
        "query": defaultArticleQuery,
        "sort": {
            "clicks": {
                "order": "desc"
            }
        }
    };
};

const getNewArticles = (size = 20) => {
    return {
        "_source": [
            "url",
            "name",
            "author",
            "updatedAt",
            "title",
            "images",
            "transformedImages",
        ],
        "size": size,
        "query": defaultArticleQuery,
        "sort": {
            "updatedAt": {
                "order": "desc"
            }
        }
    };
};

const getAllRelatedArticlesByProduct = (product, size = 200) => {
    return {
        "size": size,
        "_source": [
            "url",
            "name",
            "author",
            "updatedAt",
            "title",
            "description",
            "images",
            "transformedImages",
        ],
        "query": {
            "query_string": {
                "query": `*${product}*`,
                "fields": ["related_products"]
            }
        },
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};

const getRelatedArticlesByProduct = (product, articleUrl, size = 200) => {
    return {
        "size": size,
        "_source": [
            "url",
            "name",
            "author",
            "updatedAt",
            "title",
            "description",
            "images",
            "transformedImages",
        ],
        "query": {
            "bool": {
                "must": [
                    {
                        "terms": {
                            "related_products": product
                        }
                    }
                ],
                "must_not": [
                    {
                        "term": {
                            "url": articleUrl
                        }
                    }
                ]
            }
        },
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};

const getArticlesByArticleCategory = (articleCategoryUrl, size = 200) => {
    return {
        "size": size,
        "_source": [
            "url",
            "name",
            "author",
            "updatedAt",
            "title",
            "content",
            "images",
            "transformedImages",
        ],
        "query": {
            "bool": {
                "must": [
                    {
                        "term": {
                            "article_category": articleCategoryUrl
                        }
                    }
                ],
            }
        },
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};

const getAllArticles = async () => {
    const query = {
        "size": 10000
    };
    const data = await searchArticles(query);
    return data.hits;
};

const getArticle = (articleUrl) => {
    return {
        "query": {
            "term": {
                "url": {
                    "value": articleUrl
                }
            }
        }
    };
};

const revealed = {
    getTopArticles,
    getArticle,
    getNewArticles,
    getRelatedArticlesByProduct,
    getArticlesByArticleCategory,
    getAllRelatedArticlesByProduct,
    getAllArticles,
};

module.exports = revealed;
