'use strict';
const gulp = require('gulp');
const concatCss = require('gulp-concat-css');
const minifyCss = require('gulp-minify-css');
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const debug = require('gulp-debug');
const clean = require('gulp-clean');
const runSequence = require('run-sequence');

gulp.task('css',  () => {
  return gulp.src('source/styles/*.css')
  	.pipe(sourcemaps.init())	
  	.pipe(debug({title:'src'}))
    .pipe(concatCss("styles/bundle.css"))
	.pipe(autoprefixer({ browsers: ['last 10 versions'] }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'));
});

gulp.task('css.min',  () => {
  return gulp.src('source/styles/*.css')
    .pipe(minify("build/bundle.css"))

    .pipe(rename("styles/bundle.min.css"))
    .pipe(gulp.dest('build/'));
});


gulp.task('vendor.css',  () => {
	let source = ['bower_components/bootstrap/dist/css/bootstrap.css'];

	return gulp.src(source)
		.pipe(concatCss("styles/vendor.css"))
		.pipe(gulp.dest('build/'));
});

gulp.task('html', () => {
	return gulp.src('source/index.html')
		.pipe(gulp.dest('build'));
});

gulp.task('watch',() => {
	gulp.watch('source/styles/*.css', ['clean', 'css', 'html']);
});



gulp.task('clean', () => {
	return gulp.src([
		'build/**/*.js',
		'build/**/*.css',
		'build/**/*.html'
	], {read:false})
	.pipe(clean());
});

gulp.task('dev', ['clean'], () => { 
	runSequence(['css', 'vendor.css','html', 'watch']);
});

