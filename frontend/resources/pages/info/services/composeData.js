const css = require("../../../../src/css/css");
const R = require("ramda");
let data = require("../data-feed/info");
let pagesService = require("../../../../src/pages/pagesService");
const searchProxy = require("../../../../src/elasticsearch/searchProxy");

const getData = async (path) => {
    let result = R.clone(data);

    await getDataFromES(result, path);

    result.css = css.getFileContent("./assets/css/ifarmer-info-min.css");

    result.title = result.page._source.title;

    result.canonical = `https://ifarmer.vn/${path}/`;

    return result;
};

const getDataFromES = async (result, path) => {
    let ship = searchProxy.createShip();
    ship.addQuery("pages_v1", pagesService.getPage(path));
    let data = await ship.flush();
    result.page = data[0].hits.hits[0]; //for detail
};


const revealed = {
    getData,
};
module.exports = revealed;
