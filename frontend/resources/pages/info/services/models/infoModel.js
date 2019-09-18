let data = require("../../data-feed/info");

const infoModel = {
	get title() {
		return data.title;
	},
	get heading() {
		return data.heading;
	},
	get css() {
		return data.css;
	},
	get articles() {
		return data.articles;
	},
	get canonical(){
		return data.canonical;
	},
	set __data(d) {
		data = d;
	},

};
module.exports = infoModel;