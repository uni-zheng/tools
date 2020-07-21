import { Semver } from './semver/semver.constructor.js';

const semverUtil = {
  new(version) {
    return new Semver(version);
  },
};

export { semverUtil };
