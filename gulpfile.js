const gulp = require("gulp");
const webpackStream = require("webpack-stream");
const webpack = require("webpack");

const webpackConfig = require("./webpack.config");

//gulp webpackで実行
gulp.task('webpack',()=>{
  return webpackStream(webpackConfig,webpack)
    .pipe(gulp.dest('./'));
});

gulp.task('watch',()=>{
  gulp.watch('./src/js/**/*.js',['webpack']);
});
