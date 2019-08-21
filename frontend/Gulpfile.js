const {series} = require('gulp');
const css = require("./gulp/tasks/css");
const reduceCSS = require("./gulp/tasks/reduce-css");
const allWatchers = require("./gulp/tasks/watch");

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
    reduceCSS.scan();
    css();
    cb();
}

exports.build = build;
exports.dev = series(reduceCSS.scan, css, allWatchers);
exports.css = css;
exports.default = series(clean, build);
