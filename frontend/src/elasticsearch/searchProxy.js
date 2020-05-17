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
        console.time("Time retrieve ES");
        // console.log(JSON.stringify(queriesBody));
        let data = await realSearch.mSearch(queriesBody);
        console.timeEnd("Time retrieve ES");
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
