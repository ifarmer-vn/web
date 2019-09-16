const css = require("../../../../src/css/css");
const R = require("ramda");
const variants = require("../../../../src/variants/variantsService");
const categories = require("../../../../src/categories/categoriesService");
let data = require("../data-feed/plp");

const getData = async (categoryID) => {
    let result = R.clone(data);
    result.products = await variants.getProductsByCategory(categoryID);
    result.category = await categories.getCategory(categoryID);
    result.breadcrumb = buildBreadcrumb(result.category._source.name);
    result.css = css.getFileContent("./assets/css/ifarmer-plp-min.css");
    return result;
};

const buildBreadcrumb = (title) => {
    let result = [
        {
            "title": "Home",
            "url": "/"
        }
    ];
    result.push({
        "title": title
    });
    return result;
};

const revealed = {
    getData,
};
module.exports = revealed;