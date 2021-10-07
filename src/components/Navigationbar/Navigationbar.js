import {
  AppBar,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
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
  Paper,
  Popover,
  Slide,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@material-ui/core";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import DarkModeBtn from "../DarkModeBtn/DarkModeBtn";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { api } from "../../utils/Api";
import { exportAvatarArray } from "../../utils/AvatarUtils";
import UserService from "../../utils/UserService";
import logo from "../../Img/devil.png";
import AuthenticationService from "../security/AuthenticationService";

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
  paper: {
    borderRadius: theme.spacing(2),
  },
  avatar: {
    cursor: "pointer",
  },
  avatarGrid: {
    display: "flex",
    justifyContent: "center",
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
  const [anchorEl, setAnchorEl] = useState(null);

  const [userAvatar, setUserAvatar] = useState({});
  const avatarsArray = exportAvatarArray();

  useEffect(() => {
    const user = UserService.getUser();
    const avatar = findAvatarById(user?.avatarId);
    setUserAvatar(avatar);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const openMobileMenu = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const closeMobileMenu = () => {
    setMobileMenuAnchorEl(null);
  };

  const username = AuthenticationService.getLoggedInUserName();

  const findAvatarById = (avatarId) => {
    return avatarsArray.find((avatar) => avatar.id == avatarId);
  };

  const handleAvatar = (avatarId) => {
    api
      .saveAvatar(avatarId)
      .then(() => {
        const avatar = findAvatarById(avatarId);
        setUserAvatar(avatar); // save avatar state
        UserService.saveAvatar(avatarId); //save in localstorage
        handleClose(); //close popover
      })
      .catch((e) => console.error(e));
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
          {/* <ListItem
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
          </ListItem> */}
        </List>
        <Divider />
        <List>
          {isUserLoggedIn ? (
            <>
              <ListItem className={classes.drawerListItemUsername}>
                {/* <Typography>Welcome,</Typography> */}
                <Avatar
                  src={userAvatar?.path}
                  alt=""
                  onClick={handleClick}
                  className={classes.avatar}
                />

                <Popover
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                  }}
                  PaperProps={{
                    style: { width: "300px" },
                  }}
                >
                  <Paper
                    elevation={3}
                    component={Card}
                    className={classes.paper}
                  >
                    <CardHeader
                      title="Choose your Avatar"
                      titleTypographyProps={{ variant: "body1" }}
                      style={{ textAlign: "center" }}
                    />
                    <Divider />
                    <CardContent>
                      <Grid container>
                        {avatarsArray.map((avatar) => (
                          <Grid
                            item
                            key={avatar.id}
                            xs={4}
                            sm={3}
                            className={classes.avatarGrid}
                          >
                            <Avatar
                              src={avatar.path}
                              alt=""
                              style={{
                                marginBottom: "10px",
                                cursor: "pointer",
                              }}
                              onClick={() => handleAvatar(avatar.id)}
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                  </Paper>
                </Popover>

                <Typography className={classes.appbarUsername}>
                  {username}
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
              {/* <ListItem
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
              </ListItem> */}
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
                {/* <Button
                  color="inherit"
                  className={classes.navButton}
                  component={NavLink}
                  to="/aboutUs"
                >
                  About us
                </Button> */}
              </Grid>
              <Grid item md={6} className={classes.appbarRight}>
                {isUserLoggedIn ? (
                  <>
                    <Grid item className={classes.appbarUsernameGrid}>
                      {/* <Typography>Welcome,</Typography> */}
                      <Avatar
                        src={userAvatar?.path}
                        alt=""
                        onClick={handleClick}
                        className={classes.avatar}
                      />

                      <Popover
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                        PaperProps={{
                          style: { width: "300px" },
                        }}
                      >
                        <Paper
                          elevation={3}
                          component={Card}
                          className={classes.paper}
                        >
                          <CardHeader
                            title="Choose your Avatar"
                            titleTypographyProps={{ variant: "body1" }}
                            style={{ textAlign: "center" }}
                          />
                          <Divider />
                          <CardContent>
                            <Grid container>
                              {avatarsArray.map((avatar) => (
                                <Grid
                                  item
                                  key={avatar.id}
                                  xs={4}
                                  sm={3}
                                  className={classes.avatarGrid}
                                >
                                  <Avatar
                                    src={avatar.path}
                                    alt=""
                                    style={{
                                      marginBottom: "10px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => handleAvatar(avatar.id)}
                                  />
                                </Grid>
                              ))}
                            </Grid>
                          </CardContent>
                        </Paper>
                      </Popover>

                      <Typography className={classes.appbarUsername}>
                        {username}
                      </Typography>
                    </Grid>

                    {/* <Button
                      color="inherit"
                      className={classes.navButton}
                      component={NavLink}
                      to="/profile"
                      >
                      Profile
                    </Button> */}
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
                <DarkModeBtn
                  darkMode={darkMode}
                  handleDarkModeChange={handleDarkModeChange}
                />
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
