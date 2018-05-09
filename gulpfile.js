const gulp = require("gulp");

const bs = require("browser-sync");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const sass = require("gulp-sass");


const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

//default
gulp.task('default',['watch']);

//scss
gulp.task('compile',()=>{
  bs.get("bs-default");
  gulp.src("./src/css/*.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
});

gulp.task 'css:compile', ()->
  bs.get("bs-default")
  gulp.src './src/css/*.scss'
    .pipe plumber errorHandler: notify.onError '<%= error.message %>'
    .pipe sass()
    .pipe gulp.dest './dist/css'
    .pipe bs.stream()

gulp.task 'css:watch',()->
  gulp.watch './src/css/*.scss',['css:compile']


//js
gulp.task('webpack',()=>{
  return webpackStream(webpackConfig,webpack)
    .pipe(gulp.dest('./'));
});

gulp.task('watch',()=>{
  gulp.watch('./src/js/**/*.js',['webpack']);
});
