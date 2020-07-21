const _ = require('lodash');
const rollup = require('rollup');
const { series, src, dest, watch } = require('gulp');
const minimist = require('minimist');
const jeditor = require('gulp-json-editor');
const babel = require('rollup-plugin-babel');

const argv = minimist(process.argv.slice(2));

function copyPublic() {
  return (
    src(['public/**/*'])
    .pipe(dest('dist/public'))
  );
}

async function build() {
  const bundle = await rollup.rollup({
    input: './es/index.js',
    external: ['lodash'],
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
    ],
  });

  await bundle.write({
    file: './dist/index.min.js',
    format: 'umd',
    name: 'uzESTools',
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

const tasks = series(copyPublic, build, makePackageJson);

exports.build = tasks;
exports.default = function () {
  tasks();

  watch([
    'public/**/*',
    'es/**/*',
    'gulpfile.js',
    'webpack.config.js',
  ], tasks);
};
