import React from "react";
import { useHistory } from "react-router-dom";
import json from "../../assets/StatusCodes.json";
import { instance } from "../../utils/Api";
import UserService from "../../utils/UserService";
import { errorToast } from "../Toastify/Toastify";

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
      } else if (error.response?.status === 401) {
        UserService.removeUser();

        history.push({
          pathname: "/login",
        });
      } else if (error.response?.data?.statusCode) {
        errorToast(readJson().get(error.response.data.statusCode));
      }
      return Promise.reject();
    }
  );
  return <> </>;
};

export default ErrorHandler;
