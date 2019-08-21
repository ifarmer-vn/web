const reduceCSS = require("reduce-css-hai-bui");
const config = require("../configs/reduce-css");
const scan = () => {
    reduceCSS.initConfig(config);
    return reduceCSS.run();
};
const generateUsedClass = async () => {
    reduceCSS.initConfig(config);
    await reduceCSS.readUsedClass();
    return reduceCSS.generateUsedClass();
};
exports.generateUsedClass = generateUsedClass;
exports.scan = scan;