const getPage = (url) => {
	return {
        "query":{
            "term": {
                "url":{
                    "value": url
                }
            }
        }
    }
};

const revealed = {
    getPage
};

module.exports = revealed;
