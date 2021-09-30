/**
 * GULP PROJECT STARTER FOR HTML & SCSS PROJECTS
 * Author: Benjamin PELAUDEIX
 *
 * Version 1.0
 *
 * Inspired by Anthony BOURMAUD, teacher at La Rochelle University
 *
 * For more informations, please read README.md file
 */

/**
 * Plugins importation
 */
const gulp = require('gulp');
const del = require('del');
const browserSync = require('browser-sync');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');
const htmlMinify = require('gulp-htmlmin');
const imgMinify = require('gulp-imagemin');

/**
 * Variables
 */
const srcFolder = './src/';
const distFolder = './dist/';
const paths = {
  css: {
    src: './src/public/css/**/*.css',
    dist: './dist/public/css/',
  },
  scss: {
    src: './src/public/scss/**/*.scss',
    dist: './src/public/css/',
  },
  html: {
    src: './src/**/*.html',
    dist: './dist/',
  },
  img: {
    src: './src/public/img/**/*',
    dist: './dist/public/img/',
  },
  font: {
    src: './src/public/font/**/*',
    dist: './dist/public/font/',
  },
};
const browser = browserSync.create();

/**
 * Function: default starter behaviour
 */
function defaultStarter() {
  return 'No default behaviour. Please check README.md file for more informations';
}

/**
 * Function: reload browser on changes
 */
function browserReload() {
  browser.init({
    server: {
      baseDir: srcFolder,
    },
    port: 3000,
  });
}

/**
 * Function: clean 'dist/' folder
 */
function clear() {
  return del([distFolder]);
}

/**
 * Function: watch changes on HTML files
 */
function watchHtml() {
  return (
    gulp
      .src(paths.html.src, { since: gulp.lastRun(watchHtml) })
      .pipe(browser.stream())
  );
}

/**
 * Function: watch changes & compile SCSS files
 */
function watchAndCompileScss() {
  return (
    gulp
      .src(paths.scss.src)
      .pipe(sass.sync().on('error', sass.logError))
      .pipe(gulp.dest(paths.scss.dist))
      .pipe(browser.stream())
  );
}

/**
 * Function: minify HTML files
 */
function minifyHtml() {
  return (
    gulp
      .src(paths.html.src)
      .pipe(plumber())
      .pipe(htmlMinify({ collapseWhitespace: true }))
      .pipe(gulp.dest(paths.html.dist))
      .pipe(browser.stream())
  );
}

/**
 * Function: minify & auto-prefixing CSS files
 */
function minifyAndAutoPrefixingCss() {
  return (
    gulp
      .src(paths.css.src)
      .pipe(plumber())
      .pipe(autoprefixer())
      .pipe(cssMinify())
      .pipe(gulp.dest(paths.css.dist))
      .pipe(browser.stream())
  );
}

/**
 * Function: move fonts to 'dist/' folder
 */
function moveFont() {
  return (
    gulp
      .src(paths.font.src)
      .pipe(plumber())
      .pipe(gulp.dest(paths.font.dist))
      .pipe(browser.stream())
  );
}

/**
 * Function: minify images
 */
function minifyImg() {
  return (
    gulp
      .src(paths.img.src)
      .pipe(plumber())
      .pipe(imgMinify())
      .pipe(gulp.dest(paths.img.dist))
      .pipe(browser.stream())
  );
}

/**
 * Function: parallel HTML & SCSS files watch
 */
function watchHtmlScss() {
  gulp.watch(paths.scss.src, watchAndCompileScss);
  gulp.watch(paths.html.src, watchHtml);
}

/**
 * Function: parallel all files watch
 */
function watchFiles() {
  gulp.watch(paths.scss.src, watchAndCompileScss);
  gulp.watch(paths.css.src, minifyAndAutoPrefixingCss);
  gulp.watch(paths.html.src, minifyHtml);
}

/**
 * Parallel functions
 */
const buildSeries = gulp.series(clear, minifyHtml, watchAndCompileScss, minifyAndAutoPrefixingCss, moveFont, minifyImg);
const dev = gulp.series(watchAndCompileScss, gulp.parallel(watchHtmlScss, browserReload));
const build = gulp.series(buildSeries, gulp.parallel(watchFiles));

/**
 * Functions exportation
 */
exports.clear = clear;
exports.dev = dev;
exports.build = build;
exports.default = defaultStarter;
