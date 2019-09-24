const css = require("../../../../src/css/css");
const R = require("ramda");
const articles = require("../../../../src/articles/articlesService");
let data = require("../data-feed/alp");

const getData = async (articleCategoryID) => {
    let result = R.clone(data);
    result.articles = await articles.getArticlesByArticleCategory(articleCategoryID);
    result.css = css.getFileContent("./assets/css/ifarmer-alp-min.css");

    result.title = result.articleDetail._source.title;

    result.canonical = `/danh-muc-bai-viet/${articleCategoryID}/`;

    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;
