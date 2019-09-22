const gulpClean = require('gulp-clean');
const {src} = require("gulp");
const clean = () => {
    return src('assets/*', {read: false})
        .pipe(gulpClean());
};

module.exports = clean;
