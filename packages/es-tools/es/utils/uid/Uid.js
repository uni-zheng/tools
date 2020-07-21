class Uid {
  constructor(config) {
    const defaultConfig = {
      method: 'integer',
    };

    this.config = {
      ...defaultConfig,
      ...config,
    };

    this.latestId = null;
  }

  get() {
    switch (this.config.method) {
      case 'integer':
        return this.getIntegerId();
      case 'random':
        return this.getRandomId();
    }
  }

  getRandomId() {
    const ts = String(Date.now());

    const random = String(Math.ceil(Math.random() * 1000));

    return this.latestId = `${ts}_${random.padStart(4, '0')}`;
  }

  getIntegerId() {
    if (this.latestId === null) {
      this.latestId = 0;
    }

    if (this.latestId === Number.MAX_SAFE_INTEGER) {
      this.latestId = 0;
    } else {
      this.latestId++;
    }

    return this.latestId;
  }
}

export { Uid };
