let app;
let memcached;
const Memcached = require('memcached');
const mime = require('mime-types');
String.prototype.money = function () {
	let target = this;
	return target.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
String.prototype.replaceAll = function(search, replacement) {
	let target = this;
	return target.replace(new RegExp(search, 'g'), replacement);
};
function isResourceRequest_(req) {
	// Checks if mime-type for request is text/html. If mime type is unknown, assume text/html,
	// as it is probably a directory request.
	const mimeType = mime.lookup(req.url) || 'text/html';
	return (req.accepts && req.accepts('html') !== 'html') ||
		mimeType !== 'text/html' &&
		!req.url.endsWith('/'); // adjust for /abc.com/, which return application/x-msdownload
}
function getMemCached() {
	if(!memcached){
		initMemcached();
	}
	return memcached;
}

function initMemcached() {
	Memcached.config.maxKeySize = 4000;
	Memcached.config.maxValue = 2048576;
	memcached = new Memcached('memcached:11211',{});
}
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
	isResourceRequest_,
	getMemCached
};

module.exports = utils;