"use strict";

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('html', function () {
  return gulp.src('app/*.html').pipe(browserSync.reload({
    stream: true
  }));
});
gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss').pipe(browserSync.reload({
    stream: true
  })).pipe(sass({
    outputStyle: "compressed"
  })).pipe(autoprefixer({
    overrideBrowserslist: ['last 8 versions']
  })).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('app/css/'));
});
gulp.task('css', function () {
  return gulp.src(['node_modules/normalize.css/normalize.css', 'node_modules/slick-carousel/slick/slick.css', 'node_modules/animate.css/animate.css']).pipe(browserSync.reload({
    stream: true
  })).pipe(concat('_libs.scss')).pipe(gulp.dest('app/scss/'));
});
gulp.task('js', function () {
  return gulp.src('app/js/*.js').pipe(browserSync.reload({
    stream: true
  }));
});
gulp.task('jsLibs', function () {
  return gulp.src(['node_modules/slick-carousel/slick/slick.js', 'node_modules/parallax-js/dist/parallax.js', 'node_modules/jquery-mask-plugin/dist/jquery.mask.js']).pipe(browserSync.reload({
    stream: true
  })).pipe(concat('libs.min.js')).pipe(uglify()).pipe(gulp.dest('app/js/'));
});
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});
gulp.task('clean', function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(del.sync('docs'));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
gulp.task('export', function _callee2() {
  var html, css, js, img;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          html = gulp.src('app/**/*.html').pipe(gulp.dest('docs/'));
          css = gulp.src('app/css/**/*.css').pipe(gulp.dest('docs/css/'));
          js = gulp.src('app/js/**/*.js').pipe(gulp.dest('docs/js/'));
          img = gulp.src('app/img/**/*.*').pipe(gulp.dest('docs/img/'));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
gulp.task('build', gulp.series('clean', 'export'));
gulp.task('watch', function () {
  gulp.watch('app/*.html', gulp.series('html', 'build'));
  gulp.watch('app/scss/**/*.scss', gulp.series('scss', 'build'));
  gulp.watch('app/js/*.js', gulp.series('js', 'build'));
});
gulp.task('default', gulp.series(gulp.series(gulp.parallel('css', 'scss', 'jsLibs'), 'build'), gulp.parallel('browser-sync', 'watch')));