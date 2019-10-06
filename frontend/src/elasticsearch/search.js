const client = require("./elasticsearch");
const credential = require("./credential");

const queryIndex = (index) => async (query) => {
	console.log("search ne");
    const data = await client.search({
        index: index,
        body: query
    });
    return data.hits;
};
const search = index => queryIndex(index + credential.version);
const revealed = {
    search
};

module.exports = revealed;
