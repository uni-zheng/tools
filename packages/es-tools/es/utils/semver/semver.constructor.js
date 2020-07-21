class Semver {
  constructor(version) {
    this.version = version;
  }

  static convert(version) {
    return (
      version
      .split('.')
      .map(n => parseInt(n))
    );
  }

  static calcWeight(version) {
    return (
      Semver
      .convert(version)
      .reduce((total, v, index, versionArr) => {
        const n = versionArr.length - index;

        total += v * Math.pow(10, n);

        return total;
      }, 0)
    );
  }

  static compare(version1, version2) {
    const res1 = Semver.calcWeight(version1);
    const res2 = Semver.calcWeight(version2);

    return res1 - res2;
  }

  gt(comparedVersion) {
    return Semver.compare(this.version, comparedVersion) > 0;
  }

  gte(comparedVersion) {
    return Semver.compare(this.version, comparedVersion) >= 0;
  }

  lt(comparedVersion) {
    return Semver.compare(this.version, comparedVersion) < 0;
  }

  lte(comparedVersion) {
    return Semver.compare(this.version, comparedVersion) <= 0;
  }

  eq(comparedVersion) {
    return Semver.compare(this.version, comparedVersion) === 0;
  }
}

export { Semver };
