let data = require("../../data-feed/pdp");

const pdpModel = {
	get title() {
		return data.title;
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