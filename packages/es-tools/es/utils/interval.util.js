const intervalUtil = {
  create(cb, time, immediately) {
    if (immediately) {
      cb();
    }

    return setInterval(cb, time);
  },
};

export { intervalUtil };
