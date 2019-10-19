const realSearch = require("./search");

const createShip = () => {
    let queriesBody = [];

    const addQuery  = (index, query) => {
        queriesBody.push({
            index
        });
        queriesBody.push({
            ...query
        });
        return queriesBody;
    };
    const flush = async () => {
        let data = await realSearch.mSearch(queriesBody);
        queriesBody = [];
        return data;
    };
    return {
        addQuery,
        flush
    }
};

const revealed = {
    createShip
};

module.exports = revealed;
