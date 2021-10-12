import json from "../assets/Avatars/Avatars.json";
import UserService from "./UserService";

export const exportAvatarArray = () => {
  return json.reduce((arr, data) => {
    arr.push(data);
    return arr;
  }, []);
};

export const handleAvararOfPostAndComments = (user, data) => {
  const loggedInUsername = user.username;
  if (loggedInUsername === data?.username) {
    return user?.avatar?.path;
  }
  return UserService.findAvatarById(data.avatarId)?.path;
};
