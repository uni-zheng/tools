import { uidUtil } from './utils/uid.util.js';
import { intervalUtil } from './utils/interval.util.js';
import { semverUtil } from './utils/semver.util.js';
import { promiseUtil } from './utils/promise.util';
import { astUtil } from './utils/ast.util';
import { Graph } from './dataStructure/Graph';

const dataStructure = {
  Graph,
}

const UZUtils = {
  ast: astUtil,
  uid: uidUtil,
  interval: intervalUtil,
  semver: semverUtil,
  promise: promiseUtil,
};

export { UZUtils, dataStructure };
