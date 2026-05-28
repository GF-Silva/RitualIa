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

  /**
   * Remove um item específico da queue pelo valor.
   * Equivalente a um splice por valor.
   *
   * @param {*} item - O item a ser removido.
   * @returns {boolean} `true` se encontrou e removeu, `false` se não encontrou.
   *
   * @example
   * queue.put('a');
   * queue.put('b');
   * queue.remove('a'); // remove 'a' da fila
   */
  remove(item) {
    const index = this.queue.indexOf(item);
    if (index === -1) return false;
    this.queue.splice(index, 1);
    return true;
  }
}

export { AsyncQueue };