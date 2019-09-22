const {src, dest} = require("gulp");
const copyImage = () => {
    return src("resources/assets/images/**/*", {base:"resources/assets/"})
        .pipe(dest("assets/"))
};

module.exports = copyImage;
