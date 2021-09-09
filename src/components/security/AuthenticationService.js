import { api } from "../../utils/Api";
import UserService from "../../utils/UserService";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "user";

class AuthenticationService {
  logout() {
    api.logout().then(() => {
      UserService.removeUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
    });
  }

  isUserLoggedIn() {
    return !!UserService.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
  }

  getLoggedInUserName() {
    let user = UserService.getUser(USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user?.username;
  }

  successfulLogin(username, roles) {
    let user = { username: username, roles: roles };
    UserService.setUser(user, USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
}

export default new AuthenticationService();
