'use strict';
const configUtil = require('../../../../utils/config.util');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.configInstance = configUtil.create(this, {
      gulpWithWebpack: {
        option: {
          default: false,
          name: 'gulp + webpack',
          value: 'gulpWithWebpack',
        },
        template: [{
          from: 'gulpfile.js',
          to: 'gulpfile.js',
        }, {
          from: 'webpack.config.js',
          to: 'webpack.config.js',
        }],
        installDev: [
          'lodash',
          'gulp',
          'gulp-json-editor',
          'vinyl-named',
          'minimist',
          'webpack@5',
          'webpack-cli@4',
          'webpack-manifest-plugin@3',
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
