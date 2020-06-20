const getOffer = (url) => {
    return {
        "query": {
            "match": {
                "url": url
            }
        }
    };
};
const getShortOffers = (productUrl) => {
    return {
        "_source": [
            "url",
            "producturl",
            "name",
            "phone",
            "address",
            "loaihinh",
            "loaihinhkhac",
            "price",
        ],
        "query": {
            "match": {
                "producturl": productUrl
            }
        }
    };
};

const revealed = {
    getShortOffers,
    getOffer
};

module.exports = revealed;
