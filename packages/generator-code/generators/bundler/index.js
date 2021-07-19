"use strict";
const Generator = require("yeoman-generator");

module.exports = class extends Generator {
  async prompting() {
    const answers = await this.prompt([
      {
        name: "runList",
        type: "list",
        message: "请选择要执行的[编译器]脚手架",
        choices: [
          {
            value: "gulp-webpack",
            name: "📄Gulp + Webpack"
          }
        ]
      }
    ]);

    this.runList = answers.runList;
  }

  install() {
    [].concat(this.runList).forEach(name => {
      this.composeWith(require.resolve(`../bundler/sub-generators/${name}`));
    });
  }
};
