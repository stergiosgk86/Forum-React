import React from "react";
import { Redirect, Route } from "react-router-dom";

const AuthenticatedRoute = ({ isUserLoggedIn, ...props }) => {
  return (
    <>{isUserLoggedIn ? <Route {...props} /> : <Redirect to="/login" />}</>
  );
};

export default AuthenticatedRoute;
