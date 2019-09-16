const css = require("../../../../src/css/css");
const R = require("ramda");
const variants = require("../../../../src/variants/variantsService");
const variantTypes = require("../../../../src/variant-types/variantTypesService");
const products = require("../../../../src/products/productsService");
let data = require("../data-feed/pdp");

const getData = async (productID) => {
    let result = R.clone(data);
    result.topProducts = await variants.getTopProducts();
    result.variant = await variants.getVariant(productID);
    // result.relatedVariants = await variants.getProductsByCategory(result.variant._source.category);
    const relatedVariants = await variants.getVariantsByProduct(result.variant._source.productSource.url);
    const variantTypesData = await variantTypes.getAllVariantTypes();
    const product = await products.getProduct(result.variant._source.productSource.url);
    result.productDetail = buildProductDetail(product, result.variant);
    result.variantGroups = buildVariantGroups(result.variant._source.url, relatedVariants, variantTypesData);
    result.breadcrumb = buildBreadcrumb(result.productDetail.categorySource,
        `${result.productDetail.productSource.title} ${result.productDetail.extraTitle}`);
    result.css = css.getFileContent("./assets/css/ifarmer-pdp-min.css");
    return result;
};

const buildBreadcrumb = (category, title) => {
    let result = [
        {
            "title": "Home",
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