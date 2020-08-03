import { ConfigConstructor } from './config/Config.constructor';

const configUtil = {
  create(generatorInstance, configMap) {
    return new ConfigConstructor(generatorInstance, configMap);
  },
};

export { configUtil };
