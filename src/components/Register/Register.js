import React, { useState } from "react";
import {
  Avatar,
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  IconButton,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { NavLink, useHistory } from "react-router-dom";
import { api } from "../../utils/Api";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { successToast } from "../../Toastify/Toastify";

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
  email: yup
    .string()
    .email("Email address is invalid")
    .required("Email is required."),
  password: yup
    .string()
    .trim()
    .required("Password is required.")
    .min(4, "The password must be at least 4 characters long."),
  confirmPassword: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), null], "Passwords must be the same!"),
});

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const classes = useStyles();

  const onSubmit = (values, e) => {
    e.preventDefault();

    const signUpRequest = Object.assign({}, values);

    api
      .register(signUpRequest)
      .then((response) => {
        successToast("Congratulations! You have been successfully registered");
        history.push("/login");
      })
      .catch((error) => {});
  };

  const keypress = (e) => {
    if (e.key === "Enter") {
    }
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <div className={classes.form}>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              label="Email"
              placeholder="Enter Email"
              name="email"
              type="text"
              variant="outlined"
              margin="normal"
              {...register("email")}
              onKeyPress={keypress}
              error={Boolean(errors.email)}
              helperText={errors?.email?.message}
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

            <TextField
              fullWidth
              autoComplete="off"
              label="ConfirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              type={values.showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              {...register("confirmPassword")}
              onKeyPress={keypress}
              error={Boolean(errors.confirmPassword)}
              helperText={errors?.confirmPassword?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirmPassword visibility"
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

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <div className="login-link">
                  <Typography variant="caption">
                    Already have an account?
                  </Typography>
                  <NavLink to="/login" variant="body2">
                    <Typography variant="button">Login!</Typography>
                  </NavLink>
                </div>
              </Grid>
            </Grid>
          </form>
        </div>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
};

export default Register;
