'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('@uniz/generator-code:storybook', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/storybook'))
      .withPrompts({ someAnswer: true });
  });

  it('creates files', () => {
    assert.file(['dummyfile.txt']);
  });
});
