const css = require("../../../../src/css/css");
const R = require("ramda");
const categories = require("./categoriesService");
const variants = require("./variantsService");
const variantTypes = require("./variantTypesService");
const articles = require("./articlesService");
let data = require("../data-feed/homepage");

const getData = async () => {
    let result = R.clone(data);
    result.categories = await categories.getAllCategories();
    result.topProducts = await variants.getTopProducts();
    result.topArticles = await articles.getTopArticles();
    result.newArticles = await articles.getNewArticles();
    result.newProducts = await variants.getNewProducts();
    result.variant = await variants.getVariant("ba-khia-hang-xuat-khau-trong-luong-1-kg");
    const variantTypesData = await variantTypes.getAllVariantTypes();
    const relatedVariants = await variants.getVariantsByProduct("ba-khia");
    result.variantGroups = buildVariantGroups(result.variant._source.url, relatedVariants, variantTypesData);

    result.css = css.getFileContent("./assets/css/ifarmer-homepage-min.css");
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

const convertObjectToArrayByOrder = (obj, field)=>{
    let arr = R.values(obj);
    arr.sort((a,b)=>{
        if(a.currentType){
            a.variants = convertObjectToArrayByOrder(a.currentType,'order');
            delete a.children;
            delete a.currentType;
            delete a.show_name;
            if(!b.variants){
                b.variants = convertObjectToArrayByOrder(b.currentType,'order');
                delete b.children;
                delete b.currentType;
                delete b.show_name;
            }
        }
        if(isNaN(a[field])){
            return true;
        }
        return a[field] > b[field];
    });
    return arr;
};

const buildVariantGroups = (currentVariantUrl,variants, variantTypes) => {
    let variantTypesObj = convertArrayToObject(variantTypes,'url');
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
            if(!foundedVariantTypes[pp].currentType[valueVariantType]){
                foundedVariantTypes[pp].currentType[valueVariantType] = childType;
            }
            if(childType.active){
                foundedVariantTypes[pp].currentType[valueVariantType] = childType;
            }
        }
    });
    foundedVariantTypes = convertObjectToArrayByOrder(foundedVariantTypes,'oder');
    return foundedVariantTypes;
};

const revealed = {
    getData,
    buildVariantGroups
};
module.exports = revealed;