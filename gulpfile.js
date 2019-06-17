'use strict';

// VARS

var folderName   = 'dist'; 
var gulp         = require('gulp'),
	sass         = require('gulp-sass'), 
    autoprefixer = require('gulp-autoprefixer'), 
    uglify       = require('gulp-uglifyjs'),
    concat       = require('gulp-concat'),
    browserSync  = require('browser-sync'),
    zip          = require('gulp-zip'),
    del          = require('del');

// TASKS

gulp.task('sass', function(){
	return gulp.src('theme/sass/style.scss')
	.pipe(sass({
        outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false
    }))
	.pipe(gulp.dest('theme/css'));
});

gulp.task('css', function(){
	return gulp.src([
		'theme/libs/default/default.css',
    ])
	.pipe(concat('libraries.min.css'))
    .pipe(gulp.dest('theme/css'))
});

gulp.task('script', function(){
	return gulp.src([
        'theme/libs/jquery/jquery.min.js',
		'theme/libs/jquery/jquery.mask.min.js',
		'theme/libs/jquery/jquery.validate.min.js'
    ])
	.pipe(concat('libraries.min.js'))
	.pipe(uglify())
    .pipe(gulp.dest('theme/js'))
});

gulp.task('clear', function(){
    return del.sync([folderName]);
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: folderName
        }
    });
});

gulp.task('theme', ['clear', 'sass', 'css'], function(){
    return gulp.src([
		'!theme/sass/**/*',
		'!theme/libs/**/*',
        'theme/**/*'
    ])
    .pipe(gulp.dest(folderName))
});

gulp.task('build', ['theme'], function(){
    return del.sync([
        folderName + '/sass',
        folderName + '/libs'
    ])
});

gulp.task('watch', ['build', 'browser-sync'], function(){
    gulp.watch(['theme/sass/**/*.scss'], ['build', browserSync.reload]);
	gulp.watch(['theme/js/**/*.js'], ['build', browserSync.reload]);
	gulp.watch(['theme/**/*.html'], ['build', browserSync.reload]);
});

gulp.task('zip-theme', ['build'], function(){
    return gulp.src(folderName + '/**/*')
    .pipe(zip(folderName + '.zip'))
    .pipe(gulp.dest('zipFiles'))
});

gulp.task('default', ['script', 'watch']);