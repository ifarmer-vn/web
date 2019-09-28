let data = require("../../data-feed/info");

const infoModel = {
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
	get page() {
		return data.page;
	},
	get canonical(){
		return data.canonical;
	},
	set __data(d) {
		data = d;
	},

};
module.exports = infoModel;