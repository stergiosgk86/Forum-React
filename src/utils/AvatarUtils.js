import json from "../assets/Avatars/Avatars.json";

export const exportAvatarArray = () => {
  return json.reduce((arr, data) => {
    arr.push(data);
    return arr;
  }, []);
};
