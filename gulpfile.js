const gulp = require("gulp");

const del = require("del");

const runSequence = require("run-sequence");
const bs = require('browser-sync').create();
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");

const pug = require('gulp-pug');

const sass = require("gulp-sass");

const webpackStream = require("webpack-stream");
const webpack = require("webpack");
const webpackConfig = require("./webpack.config");

//default
gulp.task('default',()=>{
    runSequence(
      ['del'],
      ['compile'],
      ['watch'],
      ['serve']
    );
});

//del
gulp.task('del',()=>{
  return del("./dist");
});

//compile
gulp.task('compile',['html:compile','css:compile','webpack','img:copy']);

//watch
gulp.task('watch',()=>{
  gulp.watch('./src/html/**/*.pug',['html:compile']);
  gulp.watch('./src/css/*.scss',['css:compile']);
  gulp.watch('./src/js/**/*.js',['webpack']);
  gulp.watch(['./src/img/**/*.+(png|jpg|jpeg|svg)','!./src/img/sprite/*'],['img:copy']);
  gulp.watch('./src/img/sprite/*.+(png|jpg|jpeg|svg)',['img:sprite']);
  return;
});

//serve
gulp.task('serve',()=>{
  bs.init({
    server:{
      baseDir:"./dist"
    }
  });
  return;
});



///////


//pug
gulp.task('html:compile',()=>{
  return gulp.src('./src/html/*.pug')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('./dist'))
    .pipe(bs.stream());
});

//scss
gulp.task('css:compile',()=>{
  return gulp.src("./src/css/*.scss")
    .pipe(plumber({
      errorHandler: notify.onError('<%= error.message %>')
    }))
    .pipe(sass())
    .pipe(gulp.dest('./dist/css'))
    .pipe(bs.stream());
});

//js
gulp.task('webpack',()=>{
  return webpackStream(webpackConfig,webpack)
    .pipe(gulp.dest('./dist'))
    .pipe(bs.stream());
});

//img
gulp.task('img:copy',()=>{
  return gulp.src(['src/img/**/*.+(png|jpg|jpeg|svg)','!./src/img/sprite/*'])
    .pipe(gulp.dest('dist/img'))
    .pipe(bs.stream());
});
