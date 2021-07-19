const chalk = require('chalk')

const dependencyUtil = {
  filterUninstalledPackageList (packageList) {
    const packageJsonFile = this.fs.readJSON(
      this.destinationPath("package.json")
    );

    return (
      packageList.filter(packageName => {
        const exist = (
          packageJsonFile?.devDependencies?.[packageName]
          || packageJsonFile?.dependencies?.[packageName]
          || packageJsonFile?.peerDependencies?.[packageName]
        )

        if (exist) {
          console.log(
            chalk
            .bgKeyword("orange")
            .black(`package.json 中已经安装 ${packageName}`)
          );
        }

        return !exist
      })
    );
  },

  checkPackageManager () {
    const yarnLockFile = this.fs.read(
      this.destinationPath("yarn.lock"),
      {
        defaults: ""
      }
    );

    return yarnLockFile ? "yarn" : "npm";
  },

  /**
   *
   * @param packageList
   * @param options
   * @param options.dev {boolean}
   */
  install (packageList, options = {}) {
    const filteredPackageList = dependencyUtil.filterUninstalledPackageList.call(this, packageList);
    const packageManager = dependencyUtil.checkPackageManager.call(this);

    if (!filteredPackageList.length) {
      return;
    }

    this[`${packageManager}Install`](
      filteredPackageList,
      {
        [packageManager === "yarn" ? "dev" : "save-dev"]: Boolean(options.dev)
      }
    );
  }
};

module.exports = dependencyUtil;
