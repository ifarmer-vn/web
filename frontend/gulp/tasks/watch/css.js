const {watch} = require('gulp');
const css = require('../css');

const cssWatcher = () => {
    watch(
        [
            'resources/**/*.scss',
            "!**/*used.scss",
            '!**/generated/mixin.scss',
            '!**/generated/property-mixin.scss',
        ], css);
};

module.exports = cssWatcher;
