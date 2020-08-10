'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');
const configUtil = require('../../utils/config.util');

module.exports = class extends Generator {
  initializing() {
    this.configInstance = configUtil.create(this, {
      base: {
        option: {
          default: true,
          name: 'base',
          value: 'base',
        },
        template: [{
          from: 'main.template.js',
          to: '.storybook/main.js',
        }, {
          from: 'preview.template.js',
          to: '.storybook/preview.js',
        }],
        install: [
          'react',
          'react-dom',
        ],
        installDev: [
          '@storybook/addon-docs',
          '@storybook/addon-knobs',
          '@storybook/addon-a11y',
          '@storybook/addon-viewport',
          '@storybook/addon-backgrounds',
          '@storybook/addon-storysource',
          '@storybook/react',
          '@babel/core',
          'babel-loader',
          'css-loader',
          'react-is',
          'sass',
          'sass-loader',
          'style-loader',
        ],
        packageJson: {
          scripts: {
            'start:storybook': 'start-storybook',
          },
        },
      },
    });
  }

  prompting() {
    this.configInstance.setPromptAnswer('base');
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
