'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@uniz/generator-code:browserslist', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/browserslist'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
