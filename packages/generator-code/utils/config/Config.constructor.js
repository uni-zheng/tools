const _ = require('lodash');

class ConfigConstructor {
  constructor(generatorInstance, configMap) {
    this.generatorInstance = generatorInstance;
    this.configMap = configMap;

    this.answers = null;
  }

  /**
   *
   * @param {object} basePromptConfig
   * @param {string} basePromptConfig.type - list or checkbox
   * @param {string} [basePromptConfig.message]
   * @return {*[]}
   */
  createPrompt(basePromptConfig) {
    const {
      type,
    } = basePromptConfig;

    return [
      {
        ...basePromptConfig,
        name: 'answer',
        choices: (
          Object
          .values(this.configMap)
          .map(config => config.option)
        ),
        default: getDefault.call(this),
      },
    ];

    function getDefault() {
      if (type === 'list') {
        return (
          Object
          .values(this.configMap)
          .findIndex(config => (
            config.option.default
          ))
        );
      }

      if (type === 'checkbox') {
        return (
          Object
          .values(this.configMap)
          .filter(config => config.option.default)
          .map(config => (
            config.option.value
          ))
        );
      }
    }
  }

  setPromptAnswer(answer) {
    this.answer = answer;
  }

  /**
   *
   * @param {object} basePromptConfig
   * @param {string} basePromptConfig.type - list or checkbox
   * @param {string} [basePromptConfig.message]
   * @return {Promise}
   */
  prompt(basePromptConfig) {
    const promptConfig = this.createPrompt(basePromptConfig);

    return (
      this.generatorInstance.prompt(promptConfig)
      .then(res => {
        this.answer = res.answer;

        return res;
      })
    );
  }

  modifyPackageJson() {
    const packageJsonFile = this.generatorInstance.fs.readJSON(
      this.generatorInstance.destinationPath('package.json'),
    );

    this.generatorInstance.fs.writeJSON(
      this.generatorInstance.destinationPath('package.json'),
      _.merge(
        packageJsonFile,
        getSelectedPackageJson.call(this),
      ),
    );

    function getSelectedPackageJson() {
      if (_.isArray(this.answer)) {
        return (
          this.answer
          .reduce((res, value) => {
            return _.merge(res, this.configMap[value].packageJson);
          }, {})
        );
      }
      else {
        return this.configMap[this.answer].packageJson;
      }
    }
  }

  writeTemplate() {
    const selectedConfigNameList = _.isArray(this.answer) ? this.answer : [this.answer];

    selectedConfigNameList.forEach(selectedConfigName => {

      const selectedConfig = this.configMap[selectedConfigName];

      if (!selectedConfig.template) {
        return;
      }

      selectedConfig.template.forEach(templatePath => {

        if (_.isString(templatePath)) {
          this.generatorInstance.fs.copyTpl(
            this.generatorInstance.templatePath(templatePath),
            this.generatorInstance.destinationPath(templatePath),
          );
        }

        if (_.isPlainObject(templatePath)) {
          this.generatorInstance.fs.copyTpl(
            this.generatorInstance.templatePath(templatePath.from),
            this.generatorInstance.destinationPath(templatePath.to),
          );
        }
      });

    });
  }

  runYarn() {
    const selectedConfigNameList = _.isArray(this.answer) ? this.answer : [this.answer];

    const { install, installDev } = (
      selectedConfigNameList.reduce(
        (res, selectedConfigName) => {

          const selectedConfig = this.configMap[selectedConfigName];

          if (selectedConfig.install) {
            res.install.push(selectedConfig.install);
          }

          if (selectedConfig.installDev) {
            res.installDev.push(selectedConfig.installDev);
          }

          return res;
        },
        {
          install: [],
          installDev: [],
        },
      )
    );

    install.length && this.generatorInstance.yarnInstall(
      _.uniq(_.flattenDeep(install)),
    );

    installDev.length && this.generatorInstance.yarnInstall(
      _.uniq(_.flattenDeep(installDev)),
      {
        dev: true,
      },
    );
  }
}

module.exports = ConfigConstructor;
