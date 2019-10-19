const css = require("../../../../src/css/css");
const R = require("ramda");
let data = require("../data-feed/contact");
let pagesService = require("../../../../src/pages/pagesService");
const searchProxy = require("../../../../src/elasticsearch/searchProxy");

const getData = async () => {
    let result = R.clone(data);

    await getDataFromES(result);

    result.css = css.getFileContent("./assets/css/ifarmer-contact-min.css");
    result.canonical = `https://ifarmer.vn/lien-he/`;
    return result;
};

const getDataFromES = async (result) => {
    let ship = searchProxy.createShip();
    ship.addQuery("pages_v1", pagesService.getPage("lien-he"));
    let data = await ship.flush();
    result.page = data[0].hits.hits[0]; //for detail
};


const revealed = {
    getData,
};
module.exports = revealed;
