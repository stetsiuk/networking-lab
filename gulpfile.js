const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");
const imagemin     = require('gulp-imagemin');
const htmlmin      = require('gulp-htmlmin');

const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');


gulp.task('server', function() {
    browserSync({
        server: {
            baseDir: "dist"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('js', function() {
    return gulp.src('src/js/index.js')
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('dist/'))
      .pipe(browserSync.stream());
  });

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"))
        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"))
        .pipe(browserSync.stream());
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
    gulp.watch("src/js/**/*").on('all', gulp.parallel('js'));
    gulp.watch("src/icons/**/*").on('all', gulp.parallel('icons'));
    gulp.watch("src/fonts/**/*").on('all', gulp.parallel('fonts'));
});

gulp.task('default', gulp.parallel('server', 'html', 'js', 'styles', 'images', 'icons', 'fonts', 'watch'));