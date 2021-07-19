const _ = require("lodash");

class JsonEditorConstructor {
  constructor (GeneratorInstance) {
    this._gi = GeneratorInstance;
    this.path = null;
    this.exist = null;
    this.rawJson = null;
    this.editingJson = null;
  }

  read (path) {
    const gi = this._gi;

    this.path = path;
    this.rawJson = this.editingJson = gi.fs.readJSON(path);

    this.exist = !!this.rawJson

    return this;
  }

  edit (modifier) {
    this.editingJson = modifier(this.editingJson);

    return this;
  }

  set (nodePath, value) {
    if (_.isFunction(value)) {
      const replacer = value;

      const targetValue = _.cloneDeep(_.get(this.editingJson, nodePath));

      _.set(this.editingJson, nodePath, replacer(targetValue));
    } else {
      _.set(this.editingJson, nodePath, value);
    }

    return this;
  }

  get (nodePath) {
    return _.get(this.editingJson, nodePath);
  }

  mrege (json) {
    this.editingJson = _.merge(this.editingJson, json);

    return this;
  }

  update (newPath) {
    const gi = this._gi;

    gi.fs.writeJSON(newPath || this.path, this.editingJson);

    this.rawJson = this.editingJson;
    this.exist = !!this.rawJson;

    return this;
  }
}

module.exports = JsonEditorConstructor;
