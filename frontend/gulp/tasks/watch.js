const cssWatcher = require('./watch/css');
const jsWatcher = require('./watch/js');
const ejsWatcher = require('./watch/ejs');
const lazyCSSWatcher = require('./watch/lazy-css');
const baseCSS = require('./watch/base-css');

const allWatchers = () => {
    cssWatcher();
    jsWatcher();
    lazyCSSWatcher();
    // ejsWatcher();
    baseCSS();
};

module.exports = allWatchers;
