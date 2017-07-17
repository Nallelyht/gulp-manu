var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var obfuscate = require('gulp-obfuscate');

var rutas = {
	rutaJS: './src/assets/js/*.js',
	rutaCSS: './src/assets/scss/*.scss',
	ruraHTML:'src/*.html'
};
gulp.task('prepararHTML', function(){
	gulp.src(rutas.ruraHTML)
		.pipe(gulp.dest('./public/'))
});
gulp.task('prepararJS', function(){
	gulp.src(rutas.rutaJS)
		.pipe(uglify())
		.pipe(obfuscate())
		.pipe(gulp.dest('./public/assets/js/'))
});

gulp.task('prepararCSS', function(){
	gulp.src(rutas.rutaCSS)
		.pipe(sass({
		outputStyle:'compressed',
		precision: 3
	}).on('error', sass.logError))
		.pipe(gulp.dest('./public/assets/css/'))
});
gulp.task('watchChangesCSS', function(){
	browserSync.init({
		server:{
			baseDir:'./public'
		}
	});
	gulp.watch(rutas.rutaCSS, ['sass-watch']);
	gulp.watch(rutas.ruraHTML, ['html-watch']);
	gulp.watch(rutas.rutaJS, ['js-watch']);
});
gulp.task('sass-watch', ['prepararCSS'], function(){
	browserSync.reload();
});
gulp.task("js-watch", ["js"], function () {
	browserSync.reload();
});

gulp.task("html-watch", ["html"], function () {
	browserSync.reload();
});
