class AsyncQueue {
  constructor() {
    this.queue = [];
    this.waiters = [];
  }

  async put(item) {
    if (this.waiters.length > 0) {
      const resolve = this.waiters.shift();
      resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  async get() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }
    return new Promise((resolve) => {
      this.waiters.push(resolve);
    });
  }

  get size() {
    return this.queue.length;
  }
}

export { AsyncQueue };