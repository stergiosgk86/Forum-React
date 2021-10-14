import React from "react";
import { Route } from "react-router";
import { useHistory } from "react-router-dom";

const RedirectLoggedInUserRoute = ({ isUserLoggedIn, ...props }) => {
  const history = useHistory();
  return <>{isUserLoggedIn ? history.goBack() : <Route {...props} />}</>;
};

export default RedirectLoggedInUserRoute;
