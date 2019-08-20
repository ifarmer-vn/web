const {watch, series} = require('gulp');
const css = require('../css');
const reduceCss = require('../reduce-css');


const ejsWatcher = () => {
    watch(
        [
            'resources/**/*.ejs',
            'resources/**/base-css/*.css',
            '!resources/**/base-css/mixin.scss',
            '!resources/**/base-css/property-mixin.scss',
        ], series(reduceCss, css));
};

module.exports = ejsWatcher;
