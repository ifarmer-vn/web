let data = require("../../data-feed/plp");

const plpModel = {
	get title() {
		return data.title;
	},
	get heading() {
		return data.heading;
	},
	get css() {
		return data.css;
	},
	get breadcrumb() {
		return data.breadcrumb;
	},
	get products() {
		return data.products;
	},
	get structuredData() {
		return data.structuredData;
	},
	get canonical(){
		return data.canonical;
	},
	set __data(d) {
		data = d;
	},

};
module.exports = plpModel;