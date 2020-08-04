const ConfigConstructor = require('./config/Config.constructor');

const configUtil = {
  create(generatorInstance, configMap) {
    return new ConfigConstructor(generatorInstance, configMap);
  },
};

module.exports = configUtil;
