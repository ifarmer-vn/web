const { series } = require('gulp');
const css = require("./gulp/tasks/css");
const develop = require("./gulp/tasks/develop");

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.
function clean(cb) {
	console.log("clean");
	cb();
}

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
	console.log("build");
	css();
	cb();
}
function dev(cb){
	console.log("dev");
	develop();
	cb();
}

exports.build = build;
exports.dev = dev;
exports.css = css;
exports.default = series(clean, build);
