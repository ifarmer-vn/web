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

const mSearch = (queriesBody) => {
    return client.msearch({body: queriesBody}).then(result => {
        return result.responses;
    }).catch(error => {
        throw new Error(error);
    });
};

const search = index => queryIndex(index + credential.version);
const revealed = {
    search,
    mSearch
};

module.exports = revealed;
