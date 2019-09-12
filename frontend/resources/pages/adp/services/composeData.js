const css = require("../../../../src/css/css");
const R = require("ramda");
const articles = require("../../../../src/articles/articlesService");
let data = require("../data-feed/adp");

const getData = async (articleID) => {
    let result = R.clone(data);
    result.topArticles = await articles.getTopArticles();
    result.articleDetail = await articles.getArticle(articleID);
    result.topArticlesADP = await articles.getTopArticles(5);
    result.css = css.getFileContent("./assets/css/ifarmer-adp-min.css");
    return result;
};
const revealed = {
    getData,
};
module.exports = revealed;