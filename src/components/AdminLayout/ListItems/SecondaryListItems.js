import React from "react";
import { NavLink } from "react-router-dom";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import AuthenticationService from "../../security/AuthenticationService";

const SecondaryListItems = ({
  setIsUserLoggedIn,
  setIsAdminLoggedIn,
}) => {
  const logoutHandler = () => {
    setIsUserLoggedIn(false);
    setIsAdminLoggedIn(false);
    AuthenticationService.logout();
  };
  return (
    <div>
      <ListSubheader inset>Forum</ListSubheader>

      <ListItem button className="navlink" component={NavLink} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>

      <ListItem
        button
        className="navlink"
        component={NavLink}
        to="/login"
        onClick={logoutHandler}
      >
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
};

export default SecondaryListItems;
