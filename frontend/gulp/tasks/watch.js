const cssWatcher = require('./watch/css');
const jsWatcher = require('./watch/js');
const ejsWatcher = require('./watch/ejs');
const baseCSS = require('./watch/base-css');

const allWatchers = () => {
    cssWatcher();
    jsWatcher();
    ejsWatcher();
    baseCSS();
};

module.exports = allWatchers;
