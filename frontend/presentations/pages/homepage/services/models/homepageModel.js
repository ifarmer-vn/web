let data = require("../../data-feed/homepage");

const homepageModel = {
	get title() {
		return data.title;
	},
	get heading() {
		return data.heading;
	},
	set data(d) {
		data = d;
	}

};
module.exports = homepageModel;