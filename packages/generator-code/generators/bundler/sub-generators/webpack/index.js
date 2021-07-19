'use strict';
const dependencyUtil = require('../../../../utils/dependency.util');
const SuperGenerator = require('../../../../constructor/SuperGenerator.constructor');
const jsonUtil = require('../../../../utils/json.util');

module.exports = class extends SuperGenerator {
  config = {
    base: {
      installDev: [
        'webpack@5',
        'webpack-manifest-plugin',
        'file-loader',
      ],
    },
    cssCompiler: {
      stylus: {
        installDev: [
          'stylus-loader',
        ],
      },
    },
  };

  async prompting() {
    const answers = await this.prompt([
      {
        name: 'cssCompiler',
        type: 'list',
        message: '请选择 css 编译器',
        choices: [
          {
            value: 'stylus',
            name: 'stylus',
          },
        ],
      },
      {
        name: 'entryName',
        type: 'input',
        default: 'index.js',
      },
    ]);

    this.answers = answers;
  }

  async;
};
