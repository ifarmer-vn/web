const css = require("../../../../src/css/css");
const R = require("ramda");
const articles = require("../../../../src/articles/articlesService");
const articleCategoriesService = require("../../../../src/article-categories/articleCategoriesService");
const searchProxy = require("../../../../src/elasticsearch/searchProxy");
let data = require("../data-feed/alp");

const getData = async (articleCategoryID) => {
    let result = R.clone(data);

    await getDataFromES(result, articleCategoryID);

    result.css = css.getFileContent("./assets/css/ifarmer-alp-min.css");
    result.title = result.articleCategoryDetail._source.title;
    result.canonical = `https://ifarmer.vn/danh-muc-bai-viet/${articleCategoryID}/`;
    return result;
};

const getDataFromES = async (result, articleCategoryID) => {
    let ship = searchProxy.createShip();
    ship.addQuery("article-categories_v1", articleCategoriesService.getArticleCategory(articleCategoryID));
    ship.addQuery("articles_v1", articles.getArticlesByArticleCategory(articleCategoryID));
    let data = await ship.flush();
    result.articleCategoryDetail = data[0].hits.hits[0]; //for detail
    result.articles = data[1].hits.hits;
};

const revealed = {
    getData,
};

module.exports = revealed;
