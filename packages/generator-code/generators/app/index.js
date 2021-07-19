'use strict'
const Generator = require('yeoman-generator')
const InquirerFileTreeSelection = require('inquirer-file-tree-selection-prompt')

module.exports = class extends Generator {
  initializing () {
    this.env.adapter.promptModule.registerPrompt('file-tree-selection', InquirerFileTreeSelection)
  }

  async prompting () {
    const answers = await this.prompt([
      {
        name: 'runList',
        type: 'list',
        message: '请选择要执行的脚手架',
        choices: [
          {
            value: 'bundler',
            name: '📂编译器'
          }
        ]
      }
    ])

    this.runList = answers.runList
  }

  install () {
    [].concat(this.runList).forEach(name => {
      this.composeWith(require.resolve(`../${name}`), { parentPath: name })
    })
  }
}
