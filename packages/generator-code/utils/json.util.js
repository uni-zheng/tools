const JsonEditorConstructor = require('../constructor/JsonEditor.constructor')

const jsonUtil = {
  read(path) {
    const JsonEditor = new JsonEditorConstructor(this);

    return JsonEditor.read(path)
  }
};

module.exports = jsonUtil;
