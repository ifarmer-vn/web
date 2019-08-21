const {watch, series} = require('gulp');
const css = require('../css');
const {generateUsedClass} = require('../reduce-css');

const ejsWatcher = () => {
    watch(
        [
            'resources/**/*.ejs',
        ], series(generateUsedClass, css));
};

module.exports = ejsWatcher;
