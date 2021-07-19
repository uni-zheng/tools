const fileUtil = require('../utils/file.util');
const jsonUtil = require('../utils/json.util');
const dependencyUtil = require('../utils/dependency.util');
const Generator = require('yeoman-generator');

class SuperGeneratorConstructor extends Generator {
  utils = {
    dependency: {
      install: dependencyUtil.install.bind(this)
    },
    file: {
      read: fileUtil.read.bind(this)
    },
    json: {
      read: jsonUtil.read.bind(this)
    },
  };
}

module.exports = SuperGeneratorConstructor
