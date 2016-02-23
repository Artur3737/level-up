'use strict';
const gulp = require('gulp');
const concatCss= require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');
const del = require('del');
const fs = require('fs');

gulp.task('css', function () {
  return gulp.src('source/styles/**/*.css')
      .pipe(autoprefixer({
              browsers: ['last 2 versions'],
              cascade: false
      }))
      .pipe(concatCss("styles/build.css"))
      .pie(gulp.dest('build/'));
  });

gulp.task('html', function () {
    return gulp.src('source/index.html')
      .pipe(gulp.dest('build/'));
  });

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});

gulp.task('build', function() {
      runSequence('clean',
              ['scripts', 'css'],
              'html',
              callback);
});
