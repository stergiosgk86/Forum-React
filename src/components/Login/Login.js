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
// import Input from "../controls/Input";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const schema = yup.object().shape({
  username: yup.string().trim().required("Username is required."),
  password: yup
    .string()
    .required("Password is required.")
    .min(4, "The password must be at least 4 characters long."),
});

const Login = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    // showPassword: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [hasLoginFailed, setHasLoginFailed] = useState(false);
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

        setHasLoginFailed(false);
        setShowSnackbar(true);
        history.push("/");
        // history.push({
        //   pathname: "/",
        //   // state: { showSnackbar: true },
        // });
      })
      .catch(() => {
        setHasLoginFailed(true);
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
            {hasLoginFailed ? (
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
                  Wrong credentials! The Username or Password you have entered
                  is incorrect. Please try again
                </Alert>
              </Snackbar>
            ) : (
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
            )}

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
              error={Boolean(errors.username)}
              helperText={errors?.username?.message}
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
              error={Boolean(errors.password)}
              helperText={errors?.password?.message}
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
                  Forgot password?
                </NavLink>
              </Grid>
              <Grid item>
                <NavLink to="/register" variant="body2">
                  Don't have an account? Sign Up
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
