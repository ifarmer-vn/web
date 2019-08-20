const {watch} = require('gulp');
const css = require('../css');


const cssWatcher = () => {
    watch(
        [
            'resources/**/*.scss',
            "!**/*used.scss",
            '!**/base-css/mixin.scss',
            '!**/base-css/property-mixin.scss',
        ], css);
};

module.exports = cssWatcher;
