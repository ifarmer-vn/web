const css = require("../../../../src/css/css");
const R = require("ramda");
const searchProxy = require("../../../../src/elasticsearch/searchProxy");
const variants = require("../../../../src/variants/variantsService");
const articles = require("../../../../src/articles/articlesService");
const variantTypes = require("../../../../src/variant-types/variantTypesService");
const products = require("../../../../src/products/productsService");
let data = require("../data-feed/pdp");

const getData = async (productID) => {
    let result = R.clone(data);

    await getDataFromES(result, productID);

    result.relatedArticles = buildRelatedArticles(result.relatedArticles);
    result.productDetail = buildProductDetail(result.product, result.variant);
    result.productDetail.transformedImages = fallbackImage(result.productDetail);
    result.variantGroups = buildVariantGroups(
        result.variant._source.url,
        result.variant._source.variantTypes,
        result.relatedVariants,
        result.variantTypesData
    );
    result.breadcrumb = buildBreadcrumb(
        result.productDetail.categorySource,
        `${result.productDetail.productSource.title} ${result.productDetail.extraTitle}`);

    result.structuredData = buildStructuredData(result.productDetail.categorySource, result.productDetail);
    result.description = result.productDetail.description;

    result.canonical = `https://ifarmer.vn/san-pham/${productID}/`;
    result.title = result.productDetail.h1;

    result.css = css.getFileContent("./assets/css/ifarmer-pdp-min.css");
    return result;
};

const fallbackImage = (data) => {
    //Todo should fix why missing images
    if (data.transformedImages[0].image) {
        return data.transformedImages;
    }
    let result = [];
    if (data.images) {
        result = [
            {
                image: {
                    small_1x1: {
                        url: data.images[0].url
                    },
                }
            }
        ]
    }
    console.log("Missing transformedImages", data.url);
    return result;
};

const getDataFromES = async (result, productID) => {
    let ship = searchProxy.createShip();
    ship.addQuery("variants_v1", variants.getVariant(productID));
    ship.addQuery("variant-types_v1", variantTypes.getAllVariantTypes());
    let data = await ship.flush();
    result.variant = data[0].hits.hits[0]; //for detail
    result.variantTypesData = data[1].hits.hits;

    const productUrl = result.variant._source.productSource.url;

    ship.addQuery("products_v1", products.getProduct(productUrl));
    ship.addQuery("variants_v1", variants.getVariantsByProduct(productUrl));
    ship.addQuery("articles_v1", articles.getRelatedArticlesByProduct(productUrl, 8));
    ship.addQuery("variants_v1", variants.getRelatedProductsByCategory(
        result.variant._source.category,
        productUrl
    ));
    data = await ship.flush();
    result.product = data[0].hits.hits[0]; //for detail
    result.relatedVariants = data[1].hits.hits; //for detail
    result.relatedArticles = data[2].hits.hits; //for detail
    result.relatedProducts = data[3].hits.hits; //for detail
};

const buildRelatedArticles = (relatedArticles) => {
    return {
        articles: relatedArticles.slice(0, 3),
        shortenArticles: relatedArticles.slice(3, relatedArticles.length)
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
                "@id": "https://ifarmer.vn",
            }
        },
        {
            "@type": "ListItem",
            "position": "2",
            "item": {
                "@type": "Thing",
                "name": category.title,
                "@id": `https://ifarmer.vn/${category.url}/`,
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
    const url = `https://ifarmer.vn/san-pham/${productDetail.url}/`;
    const title = `${productDetail.productSource.title} ${productDetail.extraTitle}`;
    let result = {
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
    if (productDetail.transformedImages[0].image) {
        result["image"] = {
            "@type": "ImageObject",
            "url": productDetail.transformedImages[0].image.small_1x1.url,
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

const convertObjectToArray = (obj) => {
    let result = [];
    for (let pp in obj) {
        result.push(obj[pp]);
    }
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
    arr.map(item => {
        if (!item.variants) {
            item.variants = convertObjectToArray(item.currentType);
        }
    });
    return arr;
};

const checkSameOneProperty = (variantTypes1, variantTypes2) => {
    for (const pp1 in variantTypes1) {
        for (const pp2 in variantTypes2) {
            if (variantTypes1[pp1] === variantTypes2[pp2]) {
                return true;
            }
        }
    }
    return false;
};
const buildVariantGroups = (currentVariantUrl, currentVariantType, variants, variantTypes) => {
    let variantTypesObj = convertArrayToObject(variantTypes, 'url');
    let foundedVariantTypes = {};
    variants.map(variant => {
        const source = variant._source;
        source.transformedImages = fallbackImage(source);
        const vTypes = source.variantTypes;
        for (const pp in currentVariantType) {
            const valueVariantType = vTypes[pp];
            let foundedVariantType = foundedVariantTypes[pp];
            let variantType = variantTypesObj[pp];
            if (!foundedVariantType) {
                foundedVariantTypes[pp] = {
                    ...variantType,
                    currentType: {}
                };
            }
            const childType = {
                ...source,
                ...variantType.children[valueVariantType],
                active: source.url === currentVariantUrl
            };
            if ((checkSameOneProperty(vTypes, currentVariantType) || !foundedVariantTypes[pp].currentType[valueVariantType])) {
                if (!foundedVariantTypes[pp].currentType[valueVariantType] || !foundedVariantTypes[pp].currentType[valueVariantType].active) {
                    foundedVariantTypes[pp].currentType[valueVariantType] = childType;
                }
            }
            if (childType.active) {
                foundedVariantTypes[pp].currentType[valueVariantType] = childType;
            }
        }

    });
    foundedVariantTypes = convertObjectToArrayByOrder(foundedVariantTypes, 'order');
    return foundedVariantTypes;
};

const revealed = {
    getData,
    buildVariantGroups
};
module.exports = revealed;
