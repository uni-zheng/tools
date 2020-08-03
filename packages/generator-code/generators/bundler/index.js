'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  initializing() {
    this.configMap = {
      webpack: {
        defaultOption: true,
        install: [
          'webpack',
        ],
      },
      gulp: {
        defaultOption: false,
        install: [
          'babel-loader',
        ],
      },
      gulpWithWebpack: {
        defaultOption: false,
        install: [
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
        ],
        packageJson: {
          scripts: {
            'start:prod': 'gulp --env.build=prod',
            'build:prod': 'gulp build --env.build=prod',
          },
        },
      },
      gulpWithRollup: {
        defaultOption: false,
        install: [
          'lodash',
          'gulp',
          'gulp-json-editor',
          'vinyl-named',
          'rollup',
          '@rollup/plugin-babel',
          '@rollup/plugin-node-resolve',
          '@rollup/plugin-commonjs',
        ],
        packageJson: {
          scripts: {
            'start:prod': 'gulp --env.build=prod',
            'build:prod': 'gulp build --env.build=prod',
          },
        },
      },
    };
  }

  prompting() {
    const promptConfigList = [
      {
        type: 'list',
        name: 'selectedMethod',
        message: '请选择打包方式',
        choices: [{
          name: 'webpack',
          value: 'webpack',
        }, {
          name: 'gulp',
          value: 'gulp',
        }, {
          name: 'gulp + webpack',
          value: 'gulpWithWebpack',
        }, {
          name: 'gulp + rollup',
          value: 'gulpWithRollup',
        }],
        default: (
          Object.keys(this.configMap)
          .findIndex(configName => this.configMap[configName].defaultOption)
        ),
      },
    ];

    return (
      this.prompt(promptConfigList)
      .then(answers => {
        this.answers = answers;

        this.selectedConfig = this.configMap[this.answers.selectedMethod];
      })
    );
  }

  configuring() {
    const packageConfig = this.fs.readJSON(
      this.destinationPath('package.json'),
    );

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      _.merge(packageConfig, this.selectedConfig.packageJson),
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('gulpWithRollup/gulpfile.template.js'),
      this.destinationPath('gulpfile.js'),
    );
  }

  install() {
    this.yarnInstall(
      this.selectedConfig.install,
      {
        dev: true,
      },
    );
  }
};
