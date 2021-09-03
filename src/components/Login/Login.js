import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import {
  Avatar,
  makeStyles,
  Button,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
  Container,
  Snackbar,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Alert from "@material-ui/lab/Alert";
import AuthenticationService from "../security/AuthenticationService";
import { api } from "../../utils/Api";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";
// import Input from "../controls/Input";
// import Notification from "../Notification/Notification";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    // showPassword: false,
  });
  const { register, handleSubmit } = useForm({});

  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [error, setError] = useState({});
  const [showSnackbar, setShowSnackbar] = useState(false);
  // const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();
  const classes = useStyles();

  const loginClicked = (values) => {
    api
      .login(values.username, values.password)
      .then((res) => {
        AuthenticationService.successfulLogin(
          res.data.username,
          res.data.roles
        );

        // setHasLoginFailed(false);
        // setShowSnackbar(true);
        history.push("/");
        // history.push({
        //   pathname: "/",
        //   // state: { showSnackbar: true },
        // });
      })
      .catch((error) => {
        // setHasLoginFailed(true);
        // setShowSnackbar(true);
        setError(error);
        setShowSnackbar(true);
      });
  };

  const keypress = (e) => {
    if (e.key === "Enter") {
    }
  };

  const handleClose = () => {
    setShowSnackbar(false);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <Notification notify={notify} setNotify={setNotify} /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(loginClicked)}>
            {/* {hasLoginFailed ? ( */}
              <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="error"
                  elevation={10}
                  variant="filled"
                >
                  {error}
                </Alert>
              </Snackbar>
            {/* ) : (
              <Snackbar
                open={showSnackbar}
                autoHideDuration={6000}
                onClose={handleClose}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <Alert
                  onClose={handleClose}
                  severity="success"
                  elevation={10}
                  variant="filled"
                >
                  You have successfully logged in!
                </Alert>
              </Snackbar>
            )} */}

            <TextField
              autoFocus
              fullWidth
              autoComplete="off"
              label="Username"
              placeholder="Enter Username"
              name="username"
              type="text"
              variant="outlined"
              margin="normal"
              {...register("username")}
              onKeyPress={keypress}
            />

            <TextField
              fullWidth
              autoComplete="off"
              label="Password"
              placeholder="Enter Password"
              name="password"
              type={values.showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              {...register("password")}
              onKeyPress={keypress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {values.showPassword ? (
                        <Visibility color="primary" />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
                <NavLink to="#" variant="body2">
                  <Typography variant="button">
                    Forgot password?
                  </Typography>
                </NavLink>
              </Grid>
              <Grid item>
                <Typography variant="caption">
                  Don't have an account? 
                </Typography>
                <NavLink to="/register">
                  <Typography variant="button">
                   Sign Up
                  </Typography>
                </NavLink>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};
export default Login;
