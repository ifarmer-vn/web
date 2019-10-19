const nameIndex = "categories_v1";
const getName = () => nameIndex;
const getCategories = (size) => {
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
        "size": size || 20,
        "sort": {
            "impressions": {
                "order": "desc"
            }
        }
    };
};
const getCategory = async (categoryUrl) => {
    //
    // const data = await searchCategories({
    //     "query": {
    //         "term": {
    //             "url": {
    //                 "value": categoryUrl
    //             }
    //         }
    //     },
    // });
    // return data.hits[0];
};

const revealed = {
    getCategories,
    getCategory,
    getName
};

module.exports = revealed;
