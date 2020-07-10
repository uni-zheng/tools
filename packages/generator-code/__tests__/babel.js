'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@uniz/generator-code:babel', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/babel'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['babel.config.js']);
  });
});
