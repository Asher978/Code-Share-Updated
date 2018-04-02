export default class Auth {
  
  static saveUser(user) {
    sessionStorage.setItem('user', JSON.stringify(user));
  }

  static deleteUser() {
    sessionStorage.removeItem('user');
  }

  static getUser() {
    return JSON.parse(sessionStorage.getItem('user'))
  }
  
};