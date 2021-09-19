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

const SecondaryListItems = ({ updateIsUserLoggedIn }) => {
  const logoutHandler = () => {
    updateIsUserLoggedIn(false);
    AuthenticationService.logout();
  };
  return (
    <div>
      <ListSubheader inset>Forum</ListSubheader>
      <NavLink to="/" className="navlink">
        <ListItem button>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
      </NavLink>
      <NavLink to="/login" onClick={logoutHandler} className="navlink">
        <ListItem button>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default SecondaryListItems;
