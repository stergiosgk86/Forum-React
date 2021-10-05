import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import logo from "../../Img/devil.png";
import AuthenticationService from "../security/AuthenticationService";
import DarkModeBtn from "components/DarkModeBtn/DarkModeBtn";

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
      width: "100%",
      justifyContent: "end",
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
  menuIcon: {
    outline: "none!important",
  },
  logo: {
    width: "80px",
  },
  appbarLeft: {
    display: "flex",
    justifyContent: "start",
  },
  appbarRight: {
    display: "flex",
    justifyContent: "end",
  },
  appbarUsernameGrid: {
    marginRight: "20px",
    display: "flex",
    alignItems: "center",
  },
  appbarUsername: {
    marginLeft: "10px",
    textTransform: "capitalize",
    fontWeight: "bold",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  drawerListItemUsername: {
    justifyContent: "center",
  },
  list: {
    width: 250,
  },
}));

function HideOnScroll(props) {
  const { children, window } = props;

  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Navigationbar = ({
  isUserLoggedIn,
  updateIsUserLoggedIn,
  isAdminLoggedIn,
  updateIsAdminLoggedIn,
  darkMode,
  handleDarkModeChange,
  props,
}) => {
  const logoutHandler = () => {
    updateIsUserLoggedIn(false);
    updateIsAdminLoggedIn(false);
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
  const getUsername = AuthenticationService.getLoggedInUserName();

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
              <ListItem className={classes.drawerListItemUsername}>
                <Typography>Welcome,</Typography>
                <Typography className={classes.appbarUsername}>
                  {getUsername}
                </Typography>
              </ListItem>
              <ListItem style={{ justifyContent: "center" }}>
                <DarkModeBtn
                  darkMode={darkMode}
                  handleDarkModeChange={handleDarkModeChange}
                />
              </ListItem>

              {isAdminLoggedIn ? (
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
              ) : (
                ""
              )}
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
              <ListItem style={{ justifyContent: "center" }}>
                <DarkModeBtn
                  darkMode={darkMode}
                  handleDarkModeChange={handleDarkModeChange}
                />
              </ListItem>
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
            <Box component={NavLink} to="/">
              <img src={logo} alt="logo" className={classes.logo} />
            </Box>
            <Grid container className={classes.sectionDesktop}>
              <Grid item md={6} className={classes.appbarLeft}>
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
              </Grid>
              <Grid item md={6} className={classes.appbarRight}>
                <DarkModeBtn
                  darkMode={darkMode}
                  handleDarkModeChange={handleDarkModeChange}
                />
                {isUserLoggedIn ? (
                  <>
                    <Grid item className={classes.appbarUsernameGrid}>
                      <Typography>Welcome,</Typography>
                      <Typography className={classes.appbarUsername}>
                        {getUsername}
                      </Typography>
                    </Grid>
                    {isAdminLoggedIn ? (
                      <Button
                        color="inherit"
                        className={classes.navButton}
                        component={NavLink}
                        to="/dashboard"
                      >
                        Dashboard
                      </Button>
                    ) : (
                      ""
                    )}
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
              </Grid>
            </Grid>
            <Grid item className={classes.sectionMobile}>
              <IconButton
                size="medium"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                className={classes.menuIcon}
                onClick={openMobileMenu}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      {mobileMenu}
    </>
  );
};

export default Navigationbar;
