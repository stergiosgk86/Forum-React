import React from "react";
import { NavLink } from "react-router-dom";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import CategoryIcon from "@material-ui/icons/Category";
import CommentIcon from "@material-ui/icons/Comment";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import PhotoIcon from "@material-ui/icons/Photo";

const MainListItems = () => {
  return (
    <div>
      <NavLink to="/dashboard" className="navlink">
        <ListItem button>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </NavLink>
      <NavLink to="/dashboard/users" className="navlink">
        <ListItem button>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
      </NavLink>
      <NavLink to="/dashboard/posts" className="navlink">
        <ListItem button>
          <ListItemIcon>
            <PhotoIcon />
          </ListItemIcon>
          <ListItemText primary="Posts" />
        </ListItem>
      </NavLink>
      <NavLink to="/dashboard/comments" className="navlink">
        <ListItem button>
          <ListItemIcon>
            <CommentIcon />
          </ListItemIcon>
          <ListItemText primary="Comments" />
        </ListItem>
      </NavLink>
      <NavLink to="/dashboard/categories" className="navlink">
        <ListItem button>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Categories" />
        </ListItem>
      </NavLink>
    </div>
  );
};

export default MainListItems;
