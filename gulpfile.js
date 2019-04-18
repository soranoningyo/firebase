/*global require, console*/
'use strict';

var // global plugins

    gulp = require('gulp'),
    conact = require('gulp-concat'),

    // Images Plugins

    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageminJpegtran = require('imagemin-jpegtran'),


    // Html Plugins

    pug = require('gulp-pug'),
    htmlmin = require('gulp-htmlmin'),

    // Css Plugins

    prefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),

    // Js Plugins

    jsMini = require('gulp-uglify'),
    babel = require('gulp-babel');

    // ......................................

        // Html Tasks

gulp.task('html', function () {

    return gulp.src('main-files/pug/index.pug')
        .pipe(pug())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'));
});

        // Css Tasks

// Bootstrap
gulp.task('cssbootstrap', function () {

    return gulp.src('main-files/sass/cusbootstrap.scss')
        .pipe(sass())
        .pipe(prefixer('last 2 versions'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

});
// Css Main File
gulp.task('cssmain', function () {

    return gulp.src('main-files/sass/styleSheet.scss')
        .pipe(sass())
        .pipe(prefixer('last 2 versions'))
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));

});

        // Js Tasks

gulp.task('js', function () {

    return gulp.src('main-files/es6/*.*')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(jsMini())
        .pipe(gulp.dest('dist/js'));
});

        // IMGs Minifiyinig

gulp.task('imgmin', function () {

    return gulp.src('main-files/images/*')
        .pipe(imagemin({
            progressive: true,
            use: [pngquant(), imageminJpegtran()]
        }))
        .pipe(gulp.dest('dist/images'));
});

        // Watcher

gulp.task('watch', function () {

    gulp.watch('main-files/pug/index.pug', gulp.series('html'));
    gulp.watch('main-files/sass/styleSheet.scss', gulp.series('cssmain'));
    gulp.watch('main-files/sass/cusbootstrap.scss', gulp.series('cssbootstrap'));
    gulp.watch('main-files/es6/*.*', gulp.series('js'));
    gulp.watch('main-files/images/*', gulp.series('imgmin'));
});
// Making Watch The Default Task
gulp.task('default', gulp.series('watch'));