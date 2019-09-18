const {search} = require("../elasticsearch/search");

const searchPages = search("pages");
const getPage = async (url) => {

	const data = await searchPages({
        "query":{
            "term": {
                "url":{
                    "value": url
                }
            }
        }

    });
    return data.hits[0];
};

const revealed = {
    getPage
};

module.exports = revealed;
