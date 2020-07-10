'use strict';
const Generator = require('yeoman-generator');
const _ = require('lodash');

module.exports = class extends Generator {
  initializing() {
    this.configMap = {
      base: {
        defaultOption: true,
        install: [
          '@babel/core',
          '@babel/preset-env',
          '@babel/plugin-proposal-class-properties',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-export-default-from',
          '@babel/plugin-proposal-object-rest-spread',
        ],
      },
      webpack: {
        defaultOption: false,
        install: [
          'babel-loader',
        ],
      },
    };
  }

  prompting() {
    const promptConfigList = [
      {
        type: 'checkbox',
        name: 'selectedModules',
        message: '请选择希望包含的模块',
        choices: [{
          name: 'base',
          value: 'base',
        }, {
          name: 'webpack',
          value: 'webpack',
        }],
        default: (
          Object.keys(this.configMap)
          .filter(configName => this.configMap[configName].defaultOption)
        ),
        validate: options => options.length > 0 ? true : '请选择希望包含的模块',
      },
    ];

    return (
      this.prompt(promptConfigList)
      .then(answers => {
        this.answers = answers;

        this.selectedConfigMap = (
          this.answers.selectedModules.reduce((selectedConfigMap, moduleName) => {

            selectedConfigMap[moduleName] = this.configMap[moduleName];

            return selectedConfigMap;
          }, {})
        );
      })
    );
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('babel.config.template.json'),
      this.destinationPath('babel.config.json'),
    );
  }

  install() {
    this.yarnInstall(
      _.flattenDeep(
        Object.values(this.selectedConfigMap)
        .map(config => config.install),
      ),
      {
        dev: true,
      },
    );
  }
};
