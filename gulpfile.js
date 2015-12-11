var gulp    = require('gulp'),
    header  = require('gulp-header'),
    uglify  = require('gulp-uglify'),
    clean   = require('gulp-clean'),
    rename  = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    package = require('./package.json');


var banner = [
    '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().toLocaleDateString() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
    ' */',
    '\n'
].join('');

gulp.task('scripts', ['clean'], function() {
    return gulp.src('src/sticky.js')
        .pipe(plumber())
        .pipe(header(banner, { package: package }))
        .pipe(gulp.dest('dist/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(header(banner, { package: package }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('clean', function() {
    return gulp.src('dist/', {read: false})
        .pipe(plumber())
        .pipe(clean());
});




























