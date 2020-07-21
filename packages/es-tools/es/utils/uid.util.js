import { Uid } from './uid/Uid.js';

const uidUtil = {
  create() {
    return new Uid();
  },
};

export { uidUtil };
