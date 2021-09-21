import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import AuthenticationService from "../security/AuthenticationService";
import logo from "../../Img/devil.png";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  useScrollTrigger,
  Slide,
  IconButton,
  Button,
  makeStyles,
  Box,
  Drawer,
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemIcon,
} from "@material-ui/core";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonIcon from "@mui/icons-material/Person";
import LoginIcon from "@mui/icons-material/Login";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      outline: "none!important",
    },
  },
  appbar: {
    [theme.breakpoints.down("xs")]: {
      padding: 4,
    },
  },
  navButton: {
    textDecoration: "none !important",
    color: "inherit !important",
    textTransform: "inherit !important",
  },
  list: {
    width: 250,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigationbar = ({ isUserLoggedIn, updateIsUserLoggedIn, props }) => {
  const logoutHandler = () => {
    updateIsUserLoggedIn(false);
    AuthenticationService.logout();
    setMobileMenuAnchorEl(null);
  };
  const classes = useStyles();
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const openMobileMenu = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };
  const closeMobileMenu = () => {
    setMobileMenuAnchorEl(null);
  };

  const mobileMenu = (
    <Drawer anchor="left" open={isMobileMenuOpen} onClose={closeMobileMenu}>
      <div className={classes.list}>
        <List>
          <ListItem
            button
            className={classes.navButton}
            component={NavLink}
            to="/"
            onClick={closeMobileMenu}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem
            button
            className={classes.navButton}
            component={NavLink}
            to="/aboutUs"
            onClick={closeMobileMenu}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="About Us" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {isUserLoggedIn ? (
            <>
              <ListItem
                button
                className={classes.navButton}
                component={NavLink}
                to="/dashboard"
                onClick={closeMobileMenu}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              <ListItem
                button
                className={classes.navButton}
                component={NavLink}
                to="/profile"
                onClick={closeMobileMenu}
              >
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItem>
              <ListItem
                button
                className={classes.navButton}
                component={NavLink}
                to="/login"
                onClick={logoutHandler}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </>
          ) : (
            <>
              <ListItem
                button
                className={classes.navButton}
                component={NavLink}
                to="/login"
                onClick={closeMobileMenu}
              >
                <ListItemIcon>
                  <LoginIcon />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                className={classes.navButton}
                component={NavLink}
                to="/register"
                onClick={closeMobileMenu}
              >
                <ListItemIcon>
                  <VpnKeyIcon />
                </ListItemIcon>
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </div>
    </Drawer>
  );

  return (
    <>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar color="default" className={classes.appbar}>
          <Toolbar>
            <Box component={NavLink} to="/" style={{ flexGrow: 1 }}>
              <img src={logo} alt="logo" style={{ width: "80px" }} />
            </Box>
            <div className={classes.sectionDesktop}>
              <Button
                color="inherit"
                className={classes.navButton}
                component={NavLink}
                to="/"
              >
                Home
              </Button>
              <Button
                color="inherit"
                className={classes.navButton}
                component={NavLink}
                to="/aboutUs"
              >
                About us
              </Button>
              {isUserLoggedIn ? (
                <>
                  <Button
                    color="inherit"
                    className={classes.navButton}
                    component={NavLink}
                    to="/dashboard"
                  >
                    Dashboard
                  </Button>
                  <Button
                    color="inherit"
                    className={classes.navButton}
                    component={NavLink}
                    to="/profile"
                  >
                    Profile
                  </Button>
                  <Button
                    color="inherit"
                    className={classes.navButton}
                    component={NavLink}
                    to="/login"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    className={classes.navButton}
                    component={NavLink}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    className={classes.navButton}
                    component={NavLink}
                    to="/register"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
            <IconButton
              className={classes.sectionMobile}
              size="medium"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={openMobileMenu}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {mobileMenu}
    </>
  );
};

export default Navigationbar;
