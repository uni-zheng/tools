const _ = require('lodash');
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const jeditor = require('gulp-json-editor');
const del = require('del');

sass.compiler = require('sass');

function clean() {
  return del(['dist']);
}

function copyPublic() {
  return (
    src(['public/**/*'])
    .pipe(dest('dist/public'))
  );
}

async function build() {
  return (
    src('./scss/index.scss')
    .pipe(
      sass(),
    )
    .pipe(
      rename('index.min.css'),
    )
    .pipe(
      dest('./dist'),
    )
  );
}

function makePackageJson() {
  return (
    src('./package.json')
    .pipe(jeditor(json => {

      return _.merge(json, {
        main: 'index.min.css',
      });
    }))
    .pipe(dest('dist'))
  );
}

const tasks = series(clean, copyPublic, build, makePackageJson);

exports.build = tasks;
exports.default = function () {
  tasks();

  watch([
    'scss/**/*',
    'gulpfile.js',
  ], tasks);
};
