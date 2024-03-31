/**
 * Cache Class
 */
export default class Cache {
  name
  store
  expire

  /**
   * Class constructor.
   * @param  {object} options The name of the cache.
   * @param  {string} options.name The name of the cache.
   * @param  {number} options.ttl  The time to live of any cache item.
   * @returns {cache}               A new Cache instance.
   */
  constructor({ name, ttl = 0 }) {
    this.name = name;
    this.store = {};
    this.expire = ttl === 0 ? false : ttl * 1000 * 60;
  }

  /**
   * Get an item by key.
   * @param  {string} key The key of the item.
   * @returns {string}    The saved item or undefined if its TTL has expired.
   */
  get(key) {
    const now = Date.now();
    const value = this.store[key];
    if (value === undefined || (value.expire !== false && value.expire < now)) {
      return '';
    }
    return value.data;
  }

  /**
   * Set an item.
   * @param {string} key   The key of the item.
   * @param {*}      value The value of the item.
   */
  set(key, value) {
    const now = Date.now();
    this.store[key] = {
      expire: this.expire === false ? false : now + this.expire,
      data: value,
    };
  }

  /**
   * Remove an item by its key.
   * @param  {string} key The key of the item.
   */
  remove(key) {
    delete this.store[key];
  }

  /**
   * Clear the cache.
   */
  clear() {
    this.store = {};
  }
}

export const inMemoryCache = new Cache({ name: 'inMemoryCache' })