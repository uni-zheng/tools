'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  initializing() {
    this.config = {
      defaultOption: false,
      install: [
        'react',
        'react-dom'
      ],
      installDev: [
        '@storybook/react',
        'babel-loader',
        '@babel/core',
      ],
      packageJson: {
        scripts: {
          'storybook': 'start-storybook',
        },
      },
    };
  }

  configuring() {
    const packageConfig = this.fs.readJSON(
      this.destinationPath('package.json'),
    );

    this.fs.writeJSON(
      this.destinationPath('package.json'),
      _.merge(packageConfig, this.config.packageJson),
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('main.template.js'),
      this.destinationPath('.storybook/main.js'),
    );
  }

  install() {
    this.yarnInstall(
      this.config.installDev,
      {
        dev: true,
      },
    );

    this.yarnInstall(
      this.config.install,
    );
  }
};
