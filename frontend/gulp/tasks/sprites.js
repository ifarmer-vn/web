const gulp = require('gulp'),
    svgSprite = require('gulp-svg-sprite'),

    config = {
        mode: {
            view: {
                dest: ".",
                sprite:"sprites.svg"
            }
        }
    };
const sprites = () => {
    return gulp.src('**/*.svg', {cwd: 'resources/assets/images/svg'})
        .pipe(svgSprite(config))
        .pipe(gulp.dest('resources/assets'));
};
module.exports = sprites;
