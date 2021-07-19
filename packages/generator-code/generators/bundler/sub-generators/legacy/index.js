'use strict';
const configUtil = require('../../../../utils/config.util');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.configInstance = configUtil.create(this, {
      webpack: {
        option: {
          default: true,
          name: 'webpack',
          value: 'webpack',
        },
        installDev: [
          'webpack',
        ],
        packageJson: {
          scripts: {
            'start:prod': 'gulp --env.build=prod',
            'build:prod': 'gulp build --env.build=prod',
          },
        },
      },
      gulp: {
        option: {
          default: false,
          name: 'gulp',
          value: 'gulp',
        },
        installDev: [
          'babel-loader',
        ],
      },
      gulpForSass: {
        option: {
          default: false,
          name: 'gulp for sass',
          value: 'gulpForSass',
        },
        template: [{
          from: 'gulpForSass/gulpfile.js',
          to: 'gulpfile.js',
        }],
        installDev: [
          'lodash',
          'gulp',
          'gulp-json-editor',
          'sass',
          'gulp-rename',
          'del',
        ],
        packageJson: {
          scripts: {
            'start:prod': 'gulp --env.build=prod',
            'build:prod': 'gulp build --env.build=prod',
          },
        },
      },
      gulpWithWebpack: {
        option: {
          default: false,
          name: 'gulp + webpack',
          value: 'gulpWithWebpack',
        },
        template: [{
          from: 'gulpWithWebpack/gulpfile.js',
          to: 'gulpfile.js',
        }, {
          from: 'gulpWithWebpack/webpack.config.js',
          to: 'webpack.config.js',
        }],
        installDev: [
          'lodash',
          'gulp',
          'gulp-json-editor',
          'vinyl-named',
          'minimist',
          'webpack',
          'webpack-manifest-plugin',
          'webpack-stream',
          'babel-loader',
          'css-loader',
          'postcss-loader',
          'autoprefixer',
          'sass',
          'sass-loader',
          'file-loader',
          'mini-css-extract-plugin',
          'del',
        ],
        packageJson: {
          scripts: {
            'start:prod': 'gulp --env.build=prod',
            'build:prod': 'gulp build --env.build=prod',
          },
        },
      },
      gulpWithRollup: {
        option: {
          default: false,
          name: 'gulp + rollup',
          value: 'gulpWithRollup',
        },
        template: [{
          from: 'gulpWithRollup/gulpfile.js',
          to: 'gulpfile.js',
        }],
        installDev: [
          'lodash',
          'gulp',
          'gulp-json-editor',
          'vinyl-named',
          'rollup',
          '@rollup/plugin-babel',
          '@rollup/plugin-node-resolve',
          '@rollup/plugin-commonjs',
          'del',
        ],
        packageJson: {
          scripts: {
            'start:prod': 'gulp --env.build=prod',
            'build:prod': 'gulp build --env.build=prod',
          },
        },
      },
    });
  }

  prompting() {
    return (
      this.configInstance.prompt({
        type: 'list',
        name: 'selectedMethod',
        message: '请选择打包方式',
      })
    );
  }

  configuring() {
    this.configInstance.modifyPackageJson();
  }

  writing() {
    this.configInstance.writeTemplate();
  }

  install() {
    this.configInstance.runYarn();
  }
};
