const {search} = require("../../../../src/elasticsearch/search");

const searchArticles = search("articles");

const articleSource = [
    "url",
    "impressions",
    "images.url",
    "title",
    "author",
    "updatedAt"
];
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
const getTopArticles = async () => {
    const query = {
        "_source": articleSource,
        "size": 20,
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

const revealed = {
    getTopArticles
};

module.exports = revealed;
