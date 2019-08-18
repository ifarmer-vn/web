const {series} = require('gulp');
const css = require("./gulp/tasks/css");
const develop = require("./gulp/tasks/develop");
const reduceCSS = require("./gulp/tasks/reduce-css");

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
    reduceCSS();
    css();
    cb();
}

exports.build = build;
exports.dev = series(reduceCSS, css, develop);
exports.css = css;
exports.reduceCSS = reduceCSS;
exports.default = series(clean, build);
