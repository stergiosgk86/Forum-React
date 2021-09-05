class UserService {
  getUser(authenticatedUser) {
    return JSON.parse(localStorage.getItem(authenticatedUser));
  }

  setUser(user, authenticatedUser) {
    localStorage.setItem(authenticatedUser, JSON.stringify(user));
  }

  removeUser(authenticatedUser) {
    localStorage.removeItem(authenticatedUser);
  }
}

export default new UserService();
