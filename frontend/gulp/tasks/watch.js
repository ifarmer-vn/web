const cssWatcher = require('./watch/css');
const jsWatcher = require('./watch/js');
const ejsWatcher = require('./watch/ejs');

const allWatchers = () => {
    cssWatcher();
    jsWatcher();
    ejsWatcher();
};

module.exports = allWatchers;
