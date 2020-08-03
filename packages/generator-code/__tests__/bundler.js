'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@uniz/generator-code:bundler', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/bundler'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
