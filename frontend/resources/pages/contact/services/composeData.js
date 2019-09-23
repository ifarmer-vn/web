const css = require("../../../../src/css/css");
const R = require("ramda");
let data = require("../data-feed/contact");
let pagesService = require("../../../../src/pages/pagesService");
const getData = async (path) => {
    let result = R.clone(data);
    result.page = await pagesService.getPage(path);
    result.css = css.getFileContent("./assets/css/ifarmer-contact-min.css");

    result.canonical = `/lien-he/`;

    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;
