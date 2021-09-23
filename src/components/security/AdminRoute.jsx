import React from "react";
import { Redirect, Route } from "react-router-dom";

const AdminRoute = ({ isAdminLoggedIn, ...props }) => {
  return <>{isAdminLoggedIn ? <Route {...props} /> : <Redirect to="/" />}</>;
};

export default AdminRoute;
