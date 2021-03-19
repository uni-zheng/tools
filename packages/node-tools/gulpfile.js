const _ = require('lodash');
const rollup = require('rollup');
const { series, src, dest, watch } = require('gulp');
const jeditor = require('gulp-json-editor');
const babel = require('@rollup/plugin-babel').default;
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const del = require('del');

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
  const bundle = await rollup.rollup({
    input: './es/index.js',
    external: [
      'lodash',
    ],
    plugins: [
      babel({
        exclude: '**/node_modules/**',
      }),
      nodeResolve(),
      commonjs(),
    ],
  });

  await bundle.write({
    file: './dist/index.min.js',
    format: 'umd',
    name: 'uzNodeTools', // 设置名字
    exports: 'named',
    globals: {
      lodash: '_',
    },
  });
}

function makePackageJson() {
  return (
    src('./package.json')
    .pipe(jeditor(json => {

      return _.merge(json, {
        main: 'index.min.js',
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
    'es/**/*',
    'gulpfile.js',
  ], tasks);
};
