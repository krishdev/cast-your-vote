const gulp = require ("gulp");
const sass = require ("gulp-sass");
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
 
// Variables
const srcScss = "assets/scss/entries/*.scss";
const destScss = "assets/css";
const destSvg = "assets/svg";
const srcJs = "assets/scripts/scripts.js";
const destJs = "/";

/**
 * Preprocessor with SASS
 * SCSS to CSS
 */
gulp.task ('sass', function () {
    console.log('entering..');
    return gulp.src(srcScss)
        .pipe(sass())
        .pipe(gulp.dest(destScss))
        // .pipe(browserSync.stream())
})

gulp.task ('svgsprite', function () {
  console.log('entering svg');
  return gulp.src('assets/icons/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        symbol: {
          dest: '.',
          sprite: 'icons.svg'
        }
      }
    }))
    .pipe(gulp.dest(destSvg));
})



// SCSS files to watch
gulp.task('serve', gulp.series(['sass', 'svgsprite'], function() {

  // browserSync.init({
  //     server: "./",
  //     port: 8080
  // });

  gulp.watch('assets/scss/**/*.scss',  gulp.series(['sass', 'svgsprite']));
  //gulp.watch("*.html").on('change', browserSync.reload);
  //gulp.watch('assets/scripts/**/*.js').on('change', browserSync.reload); 
  // Other watchers
}));