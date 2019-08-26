const fs = require("fs");
const R = require("ramda");

String.prototype.replaceAll = function (search, replacement) {
    let target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

const regexMatching = regexString => (str, cb) => {
    return new Promise(async resolve => {
        let matches;
        // console.time("regexMatching" + str.length);
        // console.log("regexString", regexString);
        while ((matches = regexString.exec(str))) {
            // console.log("start cb");
            await cb(matches);
            // console.log("end  cb");
        }
        // console.timeEnd("regexMatching" + str.length);
        resolve();
    });
};

const getStylesRegex = /(style=")(.+?)(")/sg;
const getStylesRegexMatching = regexMatching(getStylesRegex);
const getStyles = async content => {
    // console.log("start");
    let result = [];
    await getStylesRegexMatching(content, async matches => {
        return new Promise(async resolve => {
            // console.log(matches);
            let stylesStr = matches[2];
            stylesStr = stylesStr.replaceAll('\n', '');
            let styles = stylesStr.split(';');
            result.push({
                styles,
                index: matches.index,
                origin: matches[0]
            });

            resolve();
        });
    });
    return result;
};
const getStylesAndClassesRegex = /(style=")(.+?)(" class=")(.+?)(")/sg;
const getStylesAndClassesRegexMatching = regexMatching(getStylesAndClassesRegex);

const getStylesAndClasses = async content => {
    // console.log("start");
    let result = {};
    await getStylesAndClassesRegexMatching(content, async matches => {
        return new Promise(async resolve => {
            const originClass = matches[4];
            const index = matches.index;
            result[`index-${index}`] = {
                index: index,
                originClass,
                origin: matches[0]
            };

            resolve();
        });
    });
    return result;
};

const createBaseClasses = arr => {
    let result = {};
    let replaceClasses = [];
    arr.map(item => {
        item = item.trim();
        if (!item) {
            return;
        }
        const className = item
            .replace(/[\t;#(),.]/g, '')
            .replace(': ', ':')
            .replace(/[ :]/g, '-')
            .replace(/[%]/g, '-percent');
        replaceClasses.push(className);
        result[className] = {
            className,
            property: item,
        };
    });
    result.tempReplaceStr = replaceClasses.join(" ");
    return result;
};
const parseStyles = async content => {
    const styles = await getStyles(content);
    let result = {};
    result.origin = {};
    styles.map(item => {
        const baseClasses = createBaseClasses(item.styles);
        item.replaceClasses = baseClasses.tempReplaceStr;
        result.origin[`index-${item.index}`] = item;
        delete baseClasses.tempReplaceStr;
        result = {...baseClasses, ...result}
    });
    return result;
};

const generateClasses = async content => {
    let result = {};
    const classes = await parseStyles(content);
    Object.keys(classes).map(key => {
        if (key === 'origin') {
            result.origin = classes[key];
            return;
        }
        const cl = classes[key];
        const fileName = cl.className.split('-')[0];
        // console.log(fileName);
        result[fileName] = result[fileName] ? [...result[fileName], cl] : [cl];
    });
    return result;
};
const generateCSSFiles = folder => async content => {
    const groups = await generateClasses(content);
    let origin = [];
    Object.keys(groups).map(key => {
        if (key === 'origin') {
            origin = groups[key];
            // console.log(origin);
            return;
        }
        const fileName = `${folder}_${key}.css`;
        const classes = groups[key];
        if (fs.existsSync(fileName)) {
            let content = fs.readFileSync(fileName);
            classes.map(cl => {
                const className = cl.className;
                if (!content.includes(className)) {
                    fs.appendFileSync(fileName, `.${className}{${cl.property}}\n`);
                }

            });
        } else {
            let content = "";
            classes.map(cl => {
                const className = cl.className;
                content += `.${className}{${cl.property}}\n`;
            });
            fs.writeFileSync(fileName, content);
        }

    });
    return groups;
};
const generateBaseCSS = generateCSSFiles("./resources/styles/base-css/custom-css/");

const processView = async content => {
    const data = await generateBaseCSS(content);

    const styles = await addExistedClassOnElementContainStyle(content, data.origin);
    return transformView(content, styles);
};

const transformView = (content, styles) => {
    let result = content;
    Object.keys(styles).map(key => {
        const style = styles[key];
        let replaceStr = "";
        if (style.originClass) {
            replaceStr = `class="${style.originClass} ${style.replaceClasses}"`;
            // const
        } else {
            replaceStr = `class="${style.replaceClasses}"`
        }
        // console.log("replaceStr", replaceStr);
        // console.log("origin", style.origin);
        result = result.replace(style.origin, replaceStr);
    });
    return result;
};


const addExistedClassOnElementContainStyle = async (content, styles) => {
    let result = R.clone(styles);
    const styleAndClasses = await getStylesAndClasses(content);
    Object.keys(styleAndClasses).map(key => {
        const item = styleAndClasses[key];
        const style = result[key];
        if (style) {
            style.originClass = item.originClass;
            style.origin = item.origin;
        }
    });
    return result;
};
const gulpWatch = async (file) => {
    console.time("lazy-css");
    const content = fs.readFileSync(file).toString();
    const transformed = await processView(content);
    fs.writeFileSync(file, transformed);
    console.timeEnd("lazy-css");
};

const revealed = {
    getStyles,
    createBaseClasses,
    parseStyles,
    generateClasses,
    generateCSSFiles,
    processView,
    gulpWatch,
};

module.exports = revealed;
