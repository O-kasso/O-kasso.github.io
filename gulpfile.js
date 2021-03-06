"use strict";

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var exec = require('child_process').exec;

gulp.task('sass', function(){
  return gulp.src('src/assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('src/assets/scss/**/*.scss', ['sass']);
  gulp.watch('src/**/*.html', browserSync.reload);
  gulp.watch('src/assets/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  });
});

gulp.task('useref', function() {
  return gulp.src('src/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('src/assets/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('pdfs', function() {
  return gulp.src('src/**/*.pdf')
    .pipe(gulp.dest('dist'));
});

gulp.task('cname', function() {
  return gulp.src('src/CNAME')
    .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function() {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'pdfs', 'cname'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  );
});

gulp.task('deploy', ['build'], function() {
  exec(
    'cd "$(git rev-parse --show-toplevel)" && git checkout src &>/dev/null && git subtree push --prefix dist origin master',
    function (error, stdout, stderr) {
      if (error !== null) {
       console.error('exec error: ' + error);
      }
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
    }
  );
});
