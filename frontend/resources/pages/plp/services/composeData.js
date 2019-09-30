const css = require("../../../../src/css/css");
const R = require("ramda");
const variants = require("../../../../src/variants/variantsService");
const categories = require("../../../../src/categories/categoriesService");
let data = require("../data-feed/plp");

const getData = async (categoryID) => {
    let result = R.clone(data);
    try {
        result.products = await variants.getProductsByCategory(categoryID, 200);
        result.category = await categories.getCategory(categoryID);
        result.breadcrumb = buildBreadcrumb(result.category._source.name);
        result.structuredData = buildStructuredData(result.products);
        result.title = result.heading = result.category._source.title;
        result.description = result.category._source.description;
    } catch (e) {
        console.log("Not found")
    }

    result.canonical = `http://ifarmer.vn/${categoryID}/`;

    result.css = css.getFileContent("./assets/css/ifarmer-plp-min.css");
    return result;
};

const buildStructuredData = (products) => {
    let result = [];
    result.push(buildProductStructuredData(products));
    return result;
};
const buildProductStructuredData = (products) => {
    let itemListElement = [];
    products.map((product, index) => {
        const productDetail = product._source;
        const url = `http://ifarmer.vn/san-pham/${productDetail.url}/`;
        const title = `${productDetail.productSource.title} ${productDetail.extraTitle}`;
        let item = {
            "@type": "Product",
            "position": index + 1,
            "url": url,
            "name": title,
            "offers": {
                "@type": "Offer",
                "availability": "http://schema.org/InStock",
                "price": productDetail.price,
                "priceCurrency": "VND"
            }
        };
        if (productDetail.images) {
            item.image = productDetail.images.url;
        }
        itemListElement.push(item);
    });

    return {
        "@context": "http://schema.org",
        "@type": "ItemList",
        "itemListElement": itemListElement,
    };
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
