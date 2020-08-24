'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@uniz/generator-code:test', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/test'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
