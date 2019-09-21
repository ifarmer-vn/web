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
const getTopArticles = async (size) => {
    const query = {
        "size": size || 20,
        "query": defaultArticleQuery,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
    const data = await searchArticles(query);
    return data.hits;
};

const getNewArticles = async (size) => {
    const query = {
        "size": size || 20,
        "query": defaultArticleQuery,
        "sort": {
            "updatedAt": {
                "order": "desc"
            }
        }
    };
    const data = await searchArticles(query);
    return data.hits;
};

const getArticlesByArticleCategory = async (articleCategoryID, size) => {
    const query = {
        "size": size || 20,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
    const data = await searchArticles(query);
    return data.hits;
};

const getRelatedArticlesByProduct = async (productID, size) => {
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
    getNewArticles,
    getArticlesByArticleCategory,
    getRelatedArticlesByProduct,
    getArticle,
};

module.exports = revealed;
