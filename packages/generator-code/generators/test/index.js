'use strict';
const configUtil = require('../../utils/config.util');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  initializing() {
    this.configInstance = configUtil.create(this, {
      unit: {
        option: {
          default: true,
          name: '单元测试',
          value: 'unit',
        },
        installDev: [
          'jest',
        ],
        packageJson: {
          scripts: {
            'test': 'jest',
          },
        },
      },
      reactHook: {
        option: {
          name: 'react hook test',
          value: 'reactHook',
        },
        installDev: [
          '@testing-library/react-hooks',
          'react', // todo 这里有时候不在 dev 上安装 需要配置支持一下
          'react-test-renderer',
        ],
      },
      Typescript: {
        option: {
          name: 'typescript test',
          value: 'typescript',
        },
        installDev: [
          '@babel/preset-typescript',
        ],
      },
    });
  }

  prompting() {
    return (
      this.configInstance.prompt({
        type: 'checkbox',
        name: 'selectTestPart',
        message: '请选择测试模块',
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
