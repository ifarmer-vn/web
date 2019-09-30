const css = require("../../../../src/css/css");
const R = require("ramda");
let data = require("../data-feed/info");
let pagesService = require("../../../../src/pages/pagesService");
const getData = async (path) => {
    let result = R.clone(data);
    result.page = await pagesService.getPage(path);
    result.css = css.getFileContent("./assets/css/ifarmer-info-min.css");

    result.title = result.page._source.title;

    result.canonical = `http://ifarmer.vn/${path}/`;

    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;
