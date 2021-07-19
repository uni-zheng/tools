const FileEditorConstructor = require('../constructor/FileEditor.constructor')

const fileUtil = {
  read(path) {
    const fileEditor = new FileEditorConstructor(this);

    return fileEditor.read(path)
  }
}

module.exports = fileUtil;
