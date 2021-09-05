import { errorToast } from "../Toastify/Toastify";
import { instance } from "../utils/Api";
import json from "../Assets/StatusCodes.json";
import { useHistory } from "react-router-dom";

const ErrorHandler = () => {
  const history = useHistory();
  function readJson() {
    return json.reduce((map, data) => {
      let key = Object.keys(data)[0];
      map.set(key, data[key]);
      return map;
    }, new Map());
  }

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {

      if (error.response.status === 403) {
        history.push("/login");
      } else if (error.response.status === 401) {
        errorToast(
          "Wrong credentials! The Username or Password you have entered is incorrect. Please try again"
        );
      } else if (error.response?.data?.statusCode) {
        errorToast(readJson().get(error.response.data.statusCode));
      }
      return Promise.reject();
    }
  );
  return <> </>;
};

export default ErrorHandler;
