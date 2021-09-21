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
      <ListItem button className="navlink" component={NavLink} to="/dashboard">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>

      <ListItem
        button
        className="navlink"
        component={NavLink}
        to="/dashboard/users"
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItem>

      <ListItem
        button
        className="navlink"
        component={NavLink}
        to="/dashboard/posts"
      >
        <ListItemIcon>
          <PhotoIcon />
        </ListItemIcon>
        <ListItemText primary="Posts" />
      </ListItem>

      <ListItem
        button
        className="navlink"
        component={NavLink}
        to="/dashboard/comments"
      >
        <ListItemIcon>
          <CommentIcon />
        </ListItemIcon>
        <ListItemText primary="Comments" />
      </ListItem>

      <ListItem
        button
        className="navlink"
        component={NavLink}
        to="/dashboard/categories"
      >
        <ListItemIcon>
          <CategoryIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
    </div>
  );
};

export default MainListItems;
