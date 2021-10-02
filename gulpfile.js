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
const jsMinify = require('gulp-jsmin');

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
  js: {
    src: './src/public/js/**/*.js',
    dist: './dist/public/js/',
  },
};
const browser = browserSync.create();

/**
 * @function
 * @description default starter behaviour
 * @returns string message
 */
function defaultStarter() {
  return 'No default behaviour. Please check README.md file for more informations';
}

/**
 * @function
 * @description reload browser on changes
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
 * @function
 * @description clean 'dist/' folder
 * @returns Promise
 */
function clear() {
  return del([distFolder]);
}

/**
 * @function
 * @description watch changes on HTML files
 * @returns gulp
 */
function watchHtml() {
  return (
    gulp
      .src(paths.html.src, { since: gulp.lastRun(watchHtml) })
      .pipe(browser.stream())
  );
}

/**
 * @function
 * @description watch changes & compile SCSS files
 * @returns gulp
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
 * @function
 * @description minify HTML files
 * @returns gulp
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
 * @function
 * @description minify & auto-prefixing CSS files
 * @returns gulp
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
 * @function
 * @description move fonts to 'dist/' folder
 * @returns gulp
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
 * @function
 * @description minify images
 * @returns gulp
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
 * @function
 * @description watch JS files changes to update browser sync
 * @returns gulp
 */
function watchJs() {
  return (
    gulp
      .src(paths.js.src, { since: gulp.lastRun(watchJs) })
      .pipe(plumber())
      .pipe(browser.stream())
  );
}

/**
 * @function
 * @description minify JS files and copy to dist/ folder
 * @returns gulp
 */
function minifyJs() {
  return (
    gulp
      .src(paths.js.src)
      .pipe(plumber())
      .pipe(jsMinify())
      .pipe(gulp.dest(paths.js.dist))
  );
}

/**
 * @function
 * @description parallel HTML & SCSS files watch
 */
function watchHtmlScssJs() {
  gulp.watch(paths.scss.src, watchAndCompileScss);
  gulp.watch(paths.html.src, watchHtml);
  gulp.watch(paths.js.src, watchJs);
}

/**
 * Parallel functions
 */
const dev = gulp.series(watchAndCompileScss, gulp.parallel(watchHtmlScssJs, browserReload));
const build = gulp.series(clear, minifyHtml, watchAndCompileScss, minifyAndAutoPrefixingCss, moveFont, minifyImg, minifyJs);

/**
 * Functions exportation
 */
exports.clear = clear;
exports.dev = dev;
exports.build = build;
exports.default = defaultStarter;
