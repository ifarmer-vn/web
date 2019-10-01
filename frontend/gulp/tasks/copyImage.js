const {src, dest} = require("gulp");
const copyImage = () => {
    return src(["resources/assets/images/**/*","resources/assets/img/**/*"], {base:"resources/assets/"})
        .pipe(dest("assets/"))
};

module.exports = copyImage;
