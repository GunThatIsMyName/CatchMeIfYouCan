import gulp from "gulp";
const sass = require("gulp-sass")(require("node-sass"));
sass.compiler = require("node-sass");
import autoPrefixer from "gulp-autoprefixer";
import miniCSS from "gulp-csso"
import bro from "gulp-bro"
import del from "del"
import babelify from "babelify"

const routes = {
  scss: {
    watch:"assets/scss/**/*.scss",
    src: "assets/scss/styles.scss",
    dest: "src/static/css/",
  },
  js:{
    watch:"assets/js/**/*.js",
    src:"assets/js/main.js",
    dest:"src/static/js",
  }
};

const watch = ()=>{
  gulp.watch(routes.scss.watch,styles)
}

const clean = ()=>{
  return del(["src/static"])
}

const styles = () => {
  return gulp
    .src(routes.scss.src)
    .pipe(sass())
    .pipe(autoPrefixer({
			cascade: false
		}))
    .pipe(miniCSS())
    .pipe(gulp.dest(routes.scss.dest));
};

const js =()=>{
  return gulp
  .src(routes.js.src)
  .pipe(bro({
    transform: [
      babelify.configure({ presets: ['@babel/preset-env'] }),
      [ 'uglifyify', { global: true } ]
    ]
  }))
  .pipe(gulp.dest(routes.js.dest))
}

export const dev = gulp.series([clean,styles,js,watch])