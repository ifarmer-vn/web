const css = require("../../../../src/css/css");
const R = require("ramda");
const variants = require("../../../../src/variants/variantsService");
const articles = require("../../../../src/articles/articlesService");
const variantTypes = require("../../../../src/variant-types/variantTypesService");
const products = require("../../../../src/products/productsService");
let data = require("../data-feed/pdp");

const getData = async (productID) => {
    let result = R.clone(data);
    result.topProducts = await variants.getTopProducts();
    result.variant = await variants.getVariant(productID);
    // result.relatedVariants = await variants.getProductsByCategory(result.variant._source.category);
    const productUrl = result.variant._source.productSource.url;
    const relatedVariants = await variants.getVariantsByProduct(productUrl);
    const variantTypesData = await variantTypes.getAllVariantTypes();
    const product = await products.getProduct(productUrl);
    console.log("test");
    const relatedArticles = await articles.getRelatedArticlesByProduct(productUrl,8);
    result.relatedArticles = buildRelatedArticles(relatedArticles);
    result.productDetail = buildProductDetail(product, result.variant);
    result.variantGroups = buildVariantGroups(result.variant._source.url, relatedVariants, variantTypesData);
    result.breadcrumb = buildBreadcrumb(result.productDetail.categorySource,
        `${result.productDetail.productSource.title} ${result.productDetail.extraTitle}`);
    result.structuredData = buildStructuredData(result.productDetail.categorySource, result.productDetail);

    result.css = css.getFileContent("./assets/css/ifarmer-pdp-min.css");
    return result;
};

const buildRelatedArticles = (relatedArticles) => {
  return {
      articles: relatedArticles.slice(0,3),
      shortenArticles: relatedArticles.slice(3,relatedArticles.length)
  }
};
const buildStructuredData = (category, product) => {
    let result = [];
    result.push(buildProductStructuredData(product));
    if (category) {
        result.push(buildBreadcrumbStructuredData(category));
    }
    return result;
};
const buildBreadcrumbStructuredData = (category) => {
    const itemListElement = [
        {
            "@type": "ListItem",
            "position": "1",
            "item": {
                "@type": "Thing",
                "name": "Trang Chủ",
                "@id": "http://ifarmer.vn",
            }
        },
        {
            "@type": "ListItem",
            "position": "2",
            "item": {
                "@type": "Thing",
                "name": category.title,
                "@id": `http://ifarmer.vn/${category.url}/`,
            }
        }
    ];
    return {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": itemListElement,
    };
};

const buildProductStructuredData = (productDetail) => {
    const url = `http://ifarmer.vn/san-pham/${productDetail.url}/`;
    const title = `${productDetail.productSource.title} ${productDetail.extraTitle}`;
    var result = {
        "@context": "http://schema.org",
        "@type": "Product",
        "mainEntityOfPage": url,
        "url": url,
        "name": title,
        "description": productDetail.description + " | Bán sản phẩm " + title
            + " | ifarmer.vn - Tôi là nông dân",
        "category": productDetail.categorySource.title,
        "offers": {
            "@type": "Offer",
            "availability": "http://schema.org/InStock",
            "price": productDetail.price,
            "priceCurrency": "VND"
        }
    };
    if (isNaN(productDetail.price)) {
        delete result.offers;
    }
    if (productDetail.images) {
        result["image"] = {
            "@type": "ImageObject",
            "url": productDetail.images.url,
            "height": 256,
            "width": 256
        };
    }
    return result;
};

const buildBreadcrumb = (category, title) => {
    let result = [
        {
            "title": "Trang Chủ",
            "url": "/"
        }
    ];
    result.push({
        "title": category.title,
        "url": `/${category.url}/`
    });
    result.push({
        "title": title
    });
    return result;
};

const buildProductDetail = (product, variant) => {
    let result = {
        ...product._source,
        ...variant._source,
        h1: `${product._source.title}  ${variant._source.extraTitle}`
    };
    return result;
};

const convertArrayToObject = (arr, field) => {
    let result = {};
    arr.map((item, index) => {
        const key = item._source[field] || index;
        result[key] = R.clone(item._source);
    });
    return result;
};

const convertObjectToArrayByOrder = (obj, field) => {
    let arr = R.values(obj);
    arr.sort((a, b) => {
        if (a.currentType) {
            a.variants = convertObjectToArrayByOrder(a.currentType, 'order');
            delete a.children;
            delete a.currentType;
            delete a.show_name;
            if (!b.variants) {
                b.variants = convertObjectToArrayByOrder(b.currentType, 'order');
                delete b.children;
                delete b.currentType;
                delete b.show_name;
            }
        }
        if (isNaN(a[field])) {
            return true;
        }
        return a[field] > b[field];
    });
    return arr;
};

const buildVariantGroups = (currentVariantUrl, variants, variantTypes) => {
    let variantTypesObj = convertArrayToObject(variantTypes, 'url');
    let foundedVariantTypes = {};
    variants.map(variant => {
        const source = variant._source;
        const vTypes = source.variantTypes;
        for (const pp in vTypes) {
            const valueVariantType = vTypes[pp];
            let foundedVariantType = foundedVariantTypes[pp];
            let variantType = variantTypesObj[pp];
            if (!foundedVariantType) {
                foundedVariantTypes[pp] = {
                    ...variantType,
                    currentType: {}
                };
            }
            // console.log(variantType.children);
            const childType = {
                ...source,
                ...variantType.children[valueVariantType],
                active: source.url === currentVariantUrl
            };
            if (!foundedVariantTypes[pp].currentType[valueVariantType]) {
                foundedVariantTypes[pp].currentType[valueVariantType] = childType;
            }
            if (childType.active) {
                foundedVariantTypes[pp].currentType[valueVariantType] = childType;
            }
        }
    });
    foundedVariantTypes = convertObjectToArrayByOrder(foundedVariantTypes, 'oder');
    return foundedVariantTypes;
};

const revealed = {
    getData,
    buildVariantGroups
};
module.exports = revealed;