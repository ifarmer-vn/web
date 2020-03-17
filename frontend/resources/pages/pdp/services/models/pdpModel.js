let data = require("../../data-feed/pdp");

const pdpModel = {
	 get title() {
        return data.title;
    },
    get description() {
        return data.description;
    },
	get heading() {
		return data.heading;
	},
	get css() {
		return data.css;
	},
	get variantGroups() {
		return data.variantGroups;
	},
	get variant() {
		return data.variant;
	},
	get relatedArticles() {
		return data.relatedArticles;
	},
	get relatedProducts() {
		return data.relatedProducts;
	},
	get breadcrumb() {
		return data.breadcrumb;
	},
	get ampLibraries() {
		return data.ampLibraries;
	},
	get structuredData() {
		return data.structuredData;
	},
	get productDetail() {
		return data.productDetail;
	},
	get canonical(){
		return data.canonical;
	},
	set __data(d) {
		data = d;
	},

};
module.exports = pdpModel;
