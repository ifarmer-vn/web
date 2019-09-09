const {search} = require("../../../../src/elasticsearch/search");

const searchVariant = search("variants");

const variantSource = [
    "url",
    "impressions",
    "price",
    "images.url",
    "source",
    "title",
    "extraTitle"
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

const revealed = {
    getTopProducts
};

module.exports = revealed;
