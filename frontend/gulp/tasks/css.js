const sass = require("gulp-sass");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const {src, dest} = require("gulp");
const css = () => {
    return src("resources/pages/**/ifarmer-*.scss")
        .pipe(sass())
        .pipe(rename({dirname: ''}))
        .pipe(dest("assets/css/"))
        .pipe(csso({forceMediaMerge: true}))
        .pipe(rename({suffix: '-min'}))
        .pipe(dest("assets/css/"))
};

module.exports = css;
