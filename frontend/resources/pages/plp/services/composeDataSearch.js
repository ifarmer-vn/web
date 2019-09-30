const css = require("../../../../src/css/css");
const R = require("ramda");
const variants = require("../../../../src/variants/variantsService");
let data = require("../data-feed/plp");

const getData = async (term) => {
    let result = R.clone(data);
    let minimum_should_match = 100;
    while (!result.products.length > 0 && minimum_should_match > 20) {
        result.products = await variants.searchProductsByQuery(term, `${minimum_should_match}%`);
        minimum_should_match -= 10;
    }
    result.css = css.getFileContent("./assets/css/ifarmer-plp-min.css");
    result.title = result.heading = `Tìm Kiếm "${term}"`;

    result.canonical = `http://ifarmer.vn/tim-kiem/`;

    return result;
};

const revealed = {
    getData,
};
module.exports = revealed;
