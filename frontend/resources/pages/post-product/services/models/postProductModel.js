let data = require("../../data-feed/post-product");

const postProductModel = {
	 get title() {
        return data.title;
    },
    get description() {
        return data.description;
    },
	get heading() {
		return data.heading;
	},
	get ampLibraries() {
		return data.ampLibraries;
	},
	get css() {
		return data.css;
	},
	get canonical(){
		return data.canonical;
	},
	set __data(d) {
		data = d;
	},

};
module.exports = postProductModel;