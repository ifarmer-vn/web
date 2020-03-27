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
function calcTime(timezone) {
	// create Date object for current location
	var d = new Date();

	// convert to msec
	// subtract local time zone offset
	// get UTC time in msec
	var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

	// create new Date object for different city
	// using supplied offset
	var nd = new Date(utc + (3600000*timezone));

	// return time as a string
	return nd.toLocaleString();
}

let utils = {
	getApp,
	setApp,
	calcTime,
};

module.exports = utils;