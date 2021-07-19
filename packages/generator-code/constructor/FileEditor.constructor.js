const _ = require('lodash')

class FileEditorConsturctor {
  constructor (GeneratorInstance) {
    this._gi = GeneratorInstance
    this.path = null
    this.rawFile = null
    this.editingFile = null
  }

  read (path) {
    const gi = this._gi

    this.path = path
    this.rawFile = this.editingFile = gi.fs.read(path)

    return this
  }

  convert (varsMap) {
    Object.keys(varsMap)
    .forEach(key => {
      const formattedKey = key.replace(new RegExp('\\$', 'g'), '\\$')
      this.editingFile = this.editingFile.replace(new RegExp(formattedKey, 'g'), varsMap[key])
    })

    return this
  }

  edit (modifier) {
    this.editingFile = modifier(this.editingFile)

    return this
  }

  update (newPath) {
    const gi = this._gi

    gi.fs.write(newPath || this.path, this.editingFile)

    this.rawFile = this.editingFile
  }
}

module.exports = FileEditorConsturctor
