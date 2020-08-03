const _ = require('lodash');
const { series, src, dest, watch } = require('gulp');
const compiler = require('webpack');
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const minimist = require('minimist');
const jeditor = require('gulp-json-editor');
const webpackConfig = require('./webpack.config');


const argv = minimist(process.argv.slice(2));

function copyPublic() {
  return (
    src(['public/**/*'])
    .pipe(dest('dist/public'))
  );
}

function runWebpack() {
  return (
    src([
      // 配置入口文件
      'es/index.js',
    ])
    .pipe(named())
    .pipe(webpack(
      webpackConfig(argv.env || {}),
      compiler,
    ))
    .pipe(dest('dist'))
  );
}

function makePackageJson() {
  return (
    src('./package.json')
    .pipe(jeditor(json => {

      return _.merge(json, {
        main: 'index.min.js'
      })

    }))
    .pipe(dest('dist'))
  );
}

const tasks = series(copyPublic, runWebpack, makePackageJson);

exports.build = tasks;
exports.default = function () {
  watch([
    'public/**/*',
    'es/**/*',
    'gulpfile.js',
    'webpack.config.js',
  ], tasks);
};
