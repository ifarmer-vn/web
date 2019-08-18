const reduceCSS = require("reduce-css-hai-bui");
const config = require("../configs/reduce-css");
const scan = () => {
    reduceCSS.initConfig(config);
    return reduceCSS.run();
};
module.exports = scan;