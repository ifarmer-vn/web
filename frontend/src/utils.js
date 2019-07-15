let app;

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