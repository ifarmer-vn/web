const nameIndex = "articles-categories_v1";
const getName = () => nameIndex;
const getArticleCategories = (size = 20) => {
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
const getArticleCategory = (articleCategoryUrl) => {
    return {
        "query": {
            "term": {
                "url": {
                    "value": articleCategoryUrl
                }
            }
        },
    }
};

const revealed = {
    getArticleCategories,
    getArticleCategory,
    getName
};

module.exports = revealed;
