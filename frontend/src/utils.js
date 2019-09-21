let app;
String.prototype.money = function () {
	let target = this;
	return target.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
String.prototype.replaceAll = function(search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};
function getApp(ap) {
	return app;
}

function setApp(ap) {
	app = ap;
}

let utils = {
	getApp: getApp,
	setApp: setApp,
};

module.exports = utils;