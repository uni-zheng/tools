import _ from 'lodash';

const promiseUtil = {
  /**
   * @param {promise|function} defer
   */
  interflow: (defer) => {
    if (_.isFunction(defer)) {
      return (...rest) => {
        return (
          defer(...rest)
          .then(
            res => [null, res],
            err => [err, null],
          )
        );
      };
    }

    return (
      defer
      .then(
        (res) => [null, res],
        (err) => [err, null],
      )
    );
  },
};

export { promiseUtil };
