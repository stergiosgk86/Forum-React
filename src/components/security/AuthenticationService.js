import { api } from "../../utils/Api";
import UserService from "../../utils/UserService";

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "user";

class AuthenticationService {
  logout() {
    api.logout().then(() => {
      UserService.removeUser();
    });
  }

  isUserLoggedIn() {
    return !!UserService.getUser();
  }

  getLoggedInUserName() {
    let user = UserService.getUser();
    return user?.username;
  }

  successfulLogin(username, roles, avatarId) {
    let user = { username: username, roles: roles, avatarId: avatarId };
    UserService.setUser(user, USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
}

export default new AuthenticationService();
