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
        "size": size,
        "query": defaultArticleQuery,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};

const getNewArticles = (size = 20) => {
    return {
        "size": size,
        "query": defaultArticleQuery,
        "sort": {
            "updatedAt": {
                "order": "desc"
            }
        }
    };
};

const getRelatedArticlesByProduct = (productUrl, articleUrl, size = 200) => {
    return {
        "size": size,
        "query": {
            "bool": {
                "must": [
                    {
                        "match_phrase": {
                            "related_products": productUrl
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

const getArticlesByProducts = async (productID, size) => {
    const query = {
        "size": size || 20,
        "query": {
            "bool": {
                "must": [
                    {
                        "match_phrase": {
                            "related_products": productID
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
    const data = await searchArticles(query);
    return data.hits;
};
const getAllArticles = async () => {
    const query = {
        "size": 10000
    };
    const data = await searchArticles(query);
    return data.hits;
};
const getArticle = async (articleUrl) => {
    const query = {
        "query": {
            "term": {
                "url": {
                    "value": articleUrl
                }
            }
        }
    };
    const data = await searchArticles(query);
    return data.hits[0];
};

const revealed = {
    getTopArticles,
    getArticle,
    getNewArticles,
    getRelatedArticlesByProduct,
    getArticlesByProducts,
    getAllArticles,
};

module.exports = revealed;
