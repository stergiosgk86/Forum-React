import React from "react";
import { NavLink } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PublishIcon from "@material-ui/icons/Publish";

const useStyles = makeStyles((theme) => ({
  textfield: {
    ["& fieldset"]: {
      borderRadius: `16px`,
    },
  },
  header: {
    padding: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headertitle: {
    fontSize: "2rem",
    fontWeight: 600,
  },
  userShow: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  paper: {
    margin: 20,
    borderRadius: theme.spacing(2),
  },
  avatar: {
    height: 100,
    width: 100,
  },
  accountDetails: {
    display: "flex",
    color: `rgb(107, 119, 140)`,
    paddingTop: 30,
    paddingBottom: 10,
    justifyContent: "center",
  },
  userShowInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(1),
  },
  typography: {
    marginLeft: theme.spacing(1),
  },
  userUpdateUpload: {
    display: "flex",
    justifyContent: "center",
    paddingBottom: theme.spacing(2),
  },
  userUploadImg: {
    display: "flex",
    justifyContent: "center",
  },
  cardmedia: {
    height: 200,
    width: "auto",
    borderRadius: theme.spacing(2),
  },
  userUpdateBottom: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "end",
  },
  userUpdateButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
  },
}));

const User = () => {
  const classes = useStyles();

  return (
    <>
      <Box>
        <Grid className={classes.header}>
          <Typography
            variant="subtitle2"
            component="h1"
            className={classes.headertitle}
          >
            Edit User
          </Typography>
          <NavLink to="/dashboard/newUser" className="navlink">
            <Button
              className={classes.userUpdateButton}
              variant="contained"
              size="medium"
              color="primary"
            >
              Create User
            </Button>
          </NavLink>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={6} lg={4} xl={3}>
            <Paper component={Card} elevation={3} className={classes.paper}>
              <CardContent>
                <Box className={classes.userShow}>
                  <Box>
                    <Avatar
                      className={classes.avatar}
                      variant="circular"
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                    ></Avatar>
                  </Box>
                  <Box>
                    <Typography
                      variant="body2"
                      className={classes.accountDetails}
                    >
                      Account Details
                    </Typography>
                    <Box className={classes.userShowInfo}>
                      <PersonOutlineIcon />
                      <Typography
                        className={classes.typography}
                        variant="subtitle2"
                        component="h6"
                      >
                        annabeck99
                      </Typography>
                    </Box>
                    <Box className={classes.userShowInfo}>
                      <MailOutlineIcon />
                      <Typography
                        className={classes.typography}
                        variant="subtitle2"
                        component="h6"
                      >
                        annabeck99@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
              <CardActions>
                <Button fullWidth size="medium">
                  Primary
                </Button>
              </CardActions>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} lg={8} xl={9}>
            <div>
              <form>
                <Paper component={Card} elevation={3} className={classes.paper}>
                  <CardHeader title="Edit" />
                  <Divider />
                  <CardContent>
                    <Grid container>
                      <Grid item xs={12} md={12} lg={6}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            autoComplete="off"
                            label="Username"
                            placeholder="Enter Username"
                            name="username"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            className={classes.textfield}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            autoComplete="off"
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            type="text"
                            variant="outlined"
                            margin="normal"
                            className={classes.textfield}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            autoComplete="off"
                            label="Password"
                            placeholder="Enter Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            className={classes.textfield}
                          />
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={12}
                        lg={6}
                        style={{ padding: "10px 0px" }}
                      >
                        <Box className={classes.userUpdateUpload}>
                          <CardMedia
                            className={classes.cardmedia}
                            component="img"
                            src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                            alt=""
                          />
                        </Box>
                        <Box className={classes.userUploadImg}>
                          <Button
                            className={classes.userUpdateButton}
                            variant="contained"
                            component="label"
                            size="medium"
                            color="primary"
                            startIcon={<PublishIcon />}
                          >
                            <Box>Upload Image</Box>
                            <input type="file" hidden />
                          </Button>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <Divider />
                  <Box className={classes.userUpdateBottom}>
                    <Button
                      className={classes.userUpdateButton}
                      variant="contained"
                      size="medium"
                      color="primary"
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Paper>
              </form>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default User;
