const {series} = require('gulp');
const css = require("./gulp/tasks/css");
const copyImage = require("./gulp/tasks/copyImage");
const clean = require("./gulp/tasks/clean");
const reduceCSS = require("./gulp/tasks/reduce-css");
const allWatchers = require("./gulp/tasks/watch");

// The `clean` function is not exported so it can be considered a private task.
// It can still be used within the `series()` composition.

// The `build` function is exported so it is public and can be run with the `gulp` command.
// It can also be used within the `series()` composition.
function build(cb) {
    console.log("build");
    clean();
    reduceCSS.scan();
    css();
    copyImage();
    cb();
}

exports.build = build;
exports.dev = series(clean, reduceCSS.scan, css, copyImage, allWatchers);
exports.css = css;
exports.copyImage = copyImage;
exports.default = series(clean, build);
