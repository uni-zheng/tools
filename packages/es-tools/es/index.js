import { uidUtil } from './utils/uid.util.js';
import { intervalUtil } from './utils/interval.util.js';
import { semverUtil } from './utils/semver.util.js';
import { promiseUtil } from './utils/promise.util';

const UZUtils = {
  uid: uidUtil,
  interval: intervalUtil,
  semver: semverUtil,
  promise: promiseUtil,
};

export { UZUtils };
