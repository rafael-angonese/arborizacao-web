export default class Storage {
  static tokenKey = '@token';

  static refreshTokenKey = '@refreshToken';

  static userKey = '@user';

  static async getItem(key) {
    return JSON.parse(localStorage.getItem(key));
  }

  static async removeItem(key) {
    localStorage.removeItem(key);
  }

  static async setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
