let data = require("../../data-feed/homepage");

const homepageModel = {
	get title() {
		return data.title;
	},
	get heading() {
		return data.heading;
	},
	get css() {
		return data.css;
	},
	get categories() {
		return data.categories;
	},
	get topProducts() {
		return data.topProducts;
	},
	get topArticles() {
		return data.topArticles;
	},
	get canonical(){
		return data.canonical;
	},
	set __data(d) {
		data = d;
	},

};
module.exports = homepageModel;