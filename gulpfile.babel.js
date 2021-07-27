import gulp from "gulp";
const sass = require("gulp-sass")(require("node-sass"));
sass.compiler = require("node-sass");
import autoPrefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso"
import del from "del"
import bro from "gulp-bro";
import uglifyify from "uglifyify";
import Babelify from "babelify";

const paths = {
  scss: {
    watch:"assets/scss/**/*.scss",
    src: "assets/scss/styles.scss",
    dest: "src/static/css/",
  },
  js:{
      watch:"assets/js/**/*.js",
      src:"assets/js/main.js",
      dest:"src/static/js/"
  }
};

const styles = () => {
  return gulp
  .src(paths.scss.src)
  .pipe(sass())
  .pipe(autoPrefixer({
    cascade: false
  }))
  .pipe(miniCSS())
  .pipe(gulp.dest(paths.scss.dest));
};

const js = ()=>{
    return gulp.src(paths.js.src)
    .pipe(bro({
        transform: [
            Babelify.configure({ presets: ['@babel/preset-env'] }),
          [ 'uglifyify', { global: true } ]
        ]
    }))
    .pipe(gulp.dest(paths.js.dest))
}

const clean = () => {
    return del(["src/static"])
}

const watchFiles = () =>{
    gulp.watch(paths.scss.watch,styles)
    gulp.watch(paths.js.watch,js)
}

export const dev = gulp.series([clean,styles,js,watchFiles])
export const build = gulp.series([clean,styles,js])

  