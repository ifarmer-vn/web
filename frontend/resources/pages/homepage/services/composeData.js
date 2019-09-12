const css = require("../../../../src/css/css");
const R = require("ramda");
const categories = require("../../../../src/categories/categoriesService");
const variants = require("../../../../src/variants/variantsService");
const articles = require("../../../../src/articles/articlesService");
let data = require("../data-feed/homepage");

const getData = async () => {
    let result = R.clone(data);
    result.categories = await categories.getAllCategories();
    result.topProducts = await variants.getTopProducts();
    result.topArticles = await articles.getTopArticles();
    result.newArticles = await articles.getNewArticles();
    result.newProducts = await variants.getNewProducts();
    result.articleDetail = await articles.getArticle("bach-thuoc-loi-tieu-chua-dau-bung-kinh-nguyet-khong-deu-mo-hoi-trom");
    result.topArticlesADP = await articles.getTopArticles(5);
    result.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");
    return result;
};

const revealed = {
    getData,
};
module.exports = revealed;