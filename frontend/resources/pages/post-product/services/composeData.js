const css = require("../../../../src/css/css");
const R = require("ramda");
let data = require("../data-feed/post-product");
const getData = async (path) => {
    let result = R.clone(data);
    result.css = css.getFileContent("./assets/css/ifarmer-post-product-min.css");
    result.ampLibraries = ['amp-iframe'];
    result.canonical = `https://ifarmer.vn/`;

    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;
