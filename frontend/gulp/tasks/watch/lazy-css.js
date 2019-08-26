const {watch} = require('gulp');
const lazyCSS = require('../lazy-css');

const ejsWatcher = () => {
    watch(
        [
            'resources/**/*.ejs',
        ]).on("change", async file => {
        console.time("start Watch ejs");
        await lazyCSS.gulpWatch(file);

    });
};

module.exports = ejsWatcher;
