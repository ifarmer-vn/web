const css = require("../../../../src/css/css");
const R = require("ramda");
const categories = require("../../../../src/categories/categoriesService");
const searchProxy = require("../../../../src/elasticsearch/searchProxy");
const variants = require("../../../../src/variants/variantsService");
const articles = require("../../../../src/articles/articlesService");
let data = require("../data-feed/homepage");

const getData = async () => {
    let result = R.clone(data);

    await getDataFromES(result);

    result.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");

    result.canonical = `https://ifarmer.vn`;

    return result;

};

const getDataFromES = async (result) => {
    let ship = searchProxy.createShip();
    ship.addQuery("categories_v1", categories.getCategories());
    ship.addQuery("variants_v1", variants.getTopProducts());
    ship.addQuery("variants_v1", variants.getNewProducts());
    ship.addQuery("articles_v1", articles.getTopArticles());
    ship.addQuery("articles_v1", articles.getNewArticles());
    let data = await ship.flush();
    result.categories = data[0].hits.hits;
    result.topProducts = data[1].hits.hits;
    result.newProducts = data[2].hits.hits;
    result.topArticles = data[3].hits.hits;
    result.newArticles = data[4].hits.hits;
};

const revealed = {
    getData,
};
module.exports = revealed;
