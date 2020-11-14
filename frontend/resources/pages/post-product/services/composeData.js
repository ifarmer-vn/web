const css = require("../../../../src/css/css");
const R = require("ramda");
const searchProxy = require("../../../../src/elasticsearch/searchProxy");
const variants = require("../../../../src/variants/variantsService");
const products = require("../../../../src/products/productsService");
let data = require("../data-feed/post-product");
const getData = async (variantID) => {
    let result = R.clone(data);
    await getDataFromES(result, variantID);
    result.productDetail = buildProductDetail(result.product, result.variant);
    result.css = css.getFileContent("./assets/css/ifarmer-post-product-min.css");
    result.canonical = `https://ifarmer.vn/`;
    return result;
};
const getDataFromES = async (result, variantID) => {
    let ship = searchProxy.createShip();
    ship.addQuery("variants_v1", variants.getVariant(variantID));
    let data = await ship.flush();
    result.variant = data[0].hits.hits[0]; //for detail
    const productUrl = result.variant._source.productSource.url;

    ship.addQuery("products_v1", products.getProduct(productUrl));

    data = await ship.flush();
    result.product = data[0].hits.hits[0]; //for detail
};

const buildProductDetail = (product, variant) => {
    let result = {
        ...product._source,
        ...variant._source,
        h1: variant._source.title ? variant._source.title : `${product._source.title}  ${variant._source.extraTitle}`
    };
    return result;
};

const revealed = {
    getData,
};
module.exports = revealed;
