import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../components/security/AuthenticationService";
import { exportAvatarArray } from "../utils/AvatarUtils";

class UserService {
  getUser() {
    const localStorageUser = JSON.parse(
      localStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
    );

    if (!localStorageUser) return;

    const { username, roles, avatar } = { ...localStorageUser };

    return {
      username: username,
      roles: roles,
      avatar: avatar,
    };
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

  saveAvatar(avatar) {
    let user = { ...this.getUser(), avatar: avatar };
    this.setUser(user, USER_NAME_SESSION_ATTRIBUTE_NAME);
  }
  findAvatarById = (avatarId) => {
    return exportAvatarArray().find((avatar) => avatar.id == avatarId);
  };
  findAvatarOfLoggedInUser = () => {
    return this.findAvatarById(this.getUser().avatarId);
  };
}

export default new UserService();
