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

  //TODO move it to UserService or delete it
  getLoggedInUserName() {
    let user = UserService.getUser();
    return user?.username;
  }

  successfulLogin(username, roles, avatarId) {
    const avatar = UserService.findAvatarById(avatarId);

    let user = { username: username, roles: roles, avatar: avatar };
    UserService.setUser(user, USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user;
  }
}

export default new AuthenticationService();
