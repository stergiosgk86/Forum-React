import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../components/security/AuthenticationService";

class UserService {
  getUser() {
    return JSON.parse(localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME));
  }

  isAdmin() {
    const roles = this.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME)?.roles;
    return roles?.includes("ROLE_ADMIN");
  }

  setUser(user, authenticatedUser) {
    localStorage.setItem(authenticatedUser, JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
}

export default new UserService();
