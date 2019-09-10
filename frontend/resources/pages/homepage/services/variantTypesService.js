const {search} = require("../../../../src/elasticsearch/search");

const searchVariantTypes = search("variant-types");
const getAllVariantTypes = async () => {

	const data = await searchVariantTypes({
        "size": 20

    });
    return data.hits;
};

const revealed = {
    getAllVariantTypes
};

module.exports = revealed;
