/**
 * @class AsyncEvent
 * @description Gerencia eventos/triggers assíncronos com valor booleano.
 * Permite criar, alterar e observar o estado de um evento de forma reativa.
 *
 * @example
 * const pronto = new AsyncEvent(false);
 *
 * // Em outro lugar do código, aguarda o evento virar true
 * pronto.when(true).then(() => console.log('Está pronto!'));
 *
 * // Ativa o evento
 * pronto.set(true);
 */
class AsyncEvent {
  /**
   * @param {boolean} [initialValue=false] - Valor inicial do evento.
   */
  constructor(initialValue = false) {
    /** @type {boolean} */
    this._value = initialValue;

    /** @type {Array<{ expectedValue: boolean, resolve: Function }>} */
    this._listeners = [];
  }

  // ─── Leitura ─────────────────────────────────────────────────────────────

  /**
   * Retorna o valor atual do evento de forma assíncrona.
   *
   * @returns {Promise<boolean>}
   *
   * @example
   * const val = await evento.get();
   * console.log(val); // true ou false
   */
  async get() {
    return this._value;
  }

  /**
   * Retorna o valor atual de forma síncrona (útil para verificações rápidas).
   *
   * @returns {boolean}
   */
  peek() {
    return this._value;
  }

  // ─── Escrita ──────────────────────────────────────────────────────────────

  /**
   * Altera o valor do evento e notifica todos os listeners pendentes
   * que aguardavam esse valor.
   *
   * @param {boolean} newValue - Novo valor a ser definido.
   * @returns {AsyncEvent} Retorna a própria instância (chainable).
   *
   * @example
   * evento.set(true);
   * evento.set(false).set(true); // encadeamento
   */
  set(newValue) {
    if (typeof newValue !== 'boolean') {
      throw new TypeError(`AsyncEvent.set() espera um boolean, recebeu: ${typeof newValue}`);
    }

    this._value = newValue;
    this._notify();
    return this;
  }

  /**
   * Ativa o evento (define como `true`).
   *
   * @returns {AsyncEvent}
   *
   * @example
   * evento.activate();
   */
  activate() {
    return this.set(true);
  }

  /**
   * Desativa o evento (define como `false`).
   *
   * @returns {AsyncEvent}
   *
   * @example
   * evento.deactivate();
   */
  deactivate() {
    return this.set(false);
  }

  /**
   * Inverte o valor atual do evento.
   *
   * @returns {AsyncEvent}
   *
   * @example
   * evento.toggle(); // false → true ou true → false
   */
  toggle() {
    return this.set(!this._value);
  }

  // ─── Aguardo Assíncrono ───────────────────────────────────────────────────

  /**
   * Retorna uma Promise que resolve imediatamente se o valor atual já for
   * o esperado, ou aguarda até que ele se torne o valor esperado.
   *
   * @param {boolean} expectedValue - Valor a aguardar.
   * @returns {Promise<boolean>}
   *
   * @example
   * // Aguarda o evento virar true
   * await evento.when(true);
   * console.log('Evento ativado!');
   *
   * @example
   * // Aguarda o evento virar false
   * await evento.when(false);
   * console.log('Evento desativado!');
   */
  when(expectedValue) {
    if (this._value === expectedValue) {
      return Promise.resolve(this._value);
    }

    return new Promise((resolve) => {
      this._listeners.push({ expectedValue, resolve });
    });
  }

  /**
   * Aguarda o evento ser ativado (`true`).
   * Atalho para `evento.when(true)`.
   *
   * @returns {Promise<boolean>}
   *
   * @example
   * await evento.whenActive();
   */
  whenActive() {
    return this.when(true);
  }

  /**
   * Aguarda o evento ser desativado (`false`).
   * Atalho para `evento.when(false)`.
   *
   * @returns {Promise<boolean>}
   *
   * @example
   * await evento.whenInactive();
   */
  whenInactive() {
    return this.when(false);
  }

  /**
   * Aguarda qualquer mudança de valor (independente de qual seja).
   *
   * @returns {Promise<boolean>} Resolve com o novo valor após a mudança.
   *
   * @example
   * const novoValor = await evento.onChange();
   * console.log('Valor mudou para:', novoValor);
   */
  onChange() {
    return this.when(!this._value);
  }

  // ─── Utilitários ──────────────────────────────────────────────────────────

  /**
   * Reseta o evento para seu valor padrão (`false`).
   *
   * @returns {AsyncEvent}
   */
  reset() {
    return this.set(false);
  }

  /**
   * Retorna uma representação legível do estado atual.
   *
   * @returns {string}
   */
  toString() {
    return `AsyncEvent(${this._value})`;
  }

  // ─── Privado ──────────────────────────────────────────────────────────────

  /**
   * Notifica e remove os listeners cujo valor esperado foi atingido.
   *
   * @private
   */
  _notify() {
    this._listeners = this._listeners.filter(({ expectedValue, resolve }) => {
      if (this._value === expectedValue) {
        resolve(this._value);
        return false; // remove da lista
      }
      return true; // mantém na lista
    });
  }
}

export { AsyncEvent };