"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');

var scssFiles = 'src/assets/scss/**/*.scss';

gulp.task('sass', function(){
  return gulp.src(scssFiles)
    .pipe(sass())
    .pipe(gulp.dest('src/assets/css'));
});

gulp.task('watch', function() {
  gulp.watch(scssFiles, ['sass']);
});
