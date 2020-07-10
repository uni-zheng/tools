'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  writing() {
    this.fs.copyTpl(
      this.templatePath('.browserslist.template.text'),
      this.destinationPath('.browserslistrc'),
    );
  }
};
