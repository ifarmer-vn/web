const css = require("../../../../src/css/css");
const R = require("ramda");
let data = require("../data-feed/info");

const getData = async () => {
    let result = R.clone(data);
    result.css = css.getFileContent("./assets/css/ifarmer-info-min.css");
    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;