const css = require("../../../../src/css/css");
const R = require("ramda");
const variants = require("../../../../src/variants/variantsService");
let data = require("../data-feed/plp");

const getData = async (categoryID) => {
    let result = R.clone(data);
    result.products = await variants.getProductsByCategory(categoryID);
    result.css = css.getFileContent("./assets/css/ifarmer-plp-min.css");
    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;