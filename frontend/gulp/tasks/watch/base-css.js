const {watch, series} = require('gulp');
const css = require('../css');
const reduceCss = require('../reduce-css');

const baseCSSWatcher = () => {
    watch(
        [
            'resources/**/base-css/**/*.css',
        ], series(reduceCss.scan, css));
};

module.exports = baseCSSWatcher;
