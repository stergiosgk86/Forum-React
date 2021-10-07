import { USER_NAME_SESSION_ATTRIBUTE_NAME } from "../components/security/AuthenticationService";
import { exportAvatarArray } from "../utils/AvatarUtils";

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

  saveAvatar(avatarId) {
    let user = { ...this.getUser(), avatarId: avatarId };
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
