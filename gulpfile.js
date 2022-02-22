const gulp         = require('gulp');
const browserSync  = require('browser-sync');
const sass         = require('gulp-sass')(require('sass'));
const cleanCSS     = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename       = require("gulp-rename");
const imagemin     = require('gulp-imagemin');
const webp         = require('gulp-webp');
const htmlmin      = require('gulp-htmlmin');
const del          = require('del');
const webpHtmlNosvg = require('gulp-webp-html-nosvg');
const fonter        = require('gulp-fonter');
const ttf2woff2     = require('gulp-ttf2woff2');

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
        .pipe(webpHtmlNosvg())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('js', function() {
    return gulp.src('src/js/index.js')
      .pipe(webpackStream(webpackConfig), webpack)
      .pipe(gulp.dest('dist/js/'))
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
    return gulp.src("src/img/**/*.{jpg,jpeg,png,gif,webp}")
        .pipe(webp())
        .pipe(gulp.dest("dist/img"))

        .pipe(gulp.src("src/img/**/*.{jpg,jpeg,png,gif,webp}"))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest("dist/img"))

        .pipe(gulp.src("src/img/**/*.svg"))
        .pipe(gulp.dest("dist/img"))

        .pipe(browserSync.stream());
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*.{jpg,jpeg,png,gif,webp}")
        .pipe(webp())
        .pipe(gulp.dest("dist/icons"))

        .pipe(gulp.src("src/icons/**/*.{jpg,jpeg,png,gif,webp}"))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true,
            optimizationLevel: 3
        }))
        .pipe(gulp.dest("dist/icons"))

        .pipe(gulp.src("src/icons/**/*.svg"))
        .pipe(gulp.dest("dist/icons"))

        .pipe(browserSync.stream());
});

gulp.task('js-libs', function() {
    return gulp.src("./src/js/libs/*")
    .pipe(gulp.dest("./dist/js/libs"))
})

gulp.task('reset', function() {
    return del('./dist');
})

gulp.task('otfToTtf', function() {
	return gulp.src(`./src/fonts/*.otf`, {})
		.pipe(fonter({
			formats: ['ttf']
		}))
		.pipe(gulp.dest(`./src/fonts/`))
})

gulp.task('ttfToWoff', function() {
	return gulp.src(`./src/fonts/*.ttf`, {})
		.pipe(fonter({
			formats: ['woff']
		}))
		.pipe(gulp.dest(`./dist/fonts/`))
		.pipe(gulp.src(`./src/fonts/*.ttf`))
		.pipe(ttf2woff2())
		.pipe(gulp.dest(`dist/fonts/`))
})

gulp.task('watch', function() {
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/img/**/*").on('all', gulp.parallel('images'));
    gulp.watch("src/js/*.js").on('all', gulp.parallel('js'));
    gulp.watch("src/icons/**/*}").on('all', gulp.parallel('icons'));
});

const fonts = gulp.series('otfToTtf', 'ttfToWoff');

gulp.task('default', gulp.series('reset', gulp.parallel(fonts, 'html', 'js', 'js-libs', 'styles', 'images', 'icons', 'watch', 'server')));
