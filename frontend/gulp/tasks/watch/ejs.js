const {watch, series} = require('gulp');
const css = require('../css');
const lazyCSS = require('../lazy-css');
const {generateUsedClass} = require('../reduce-css');

const ejsWatcher = () => {
    watch(
        [
            'resources/**/*.ejs',
        ]).on("change", async file => {
        console.time("start Watch ejs");
        await lazyCSS.gulpWatch(file);
        generateUsedClass().then(async ()=>{
            await css();
            console.timeEnd("start Watch ejs");
        } );

    });
};

module.exports = ejsWatcher;
