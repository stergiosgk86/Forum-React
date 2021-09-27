import React, { useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Box,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../../../utils/Api";
import { successToast } from "../../Toastify/Toastify";

const useStyles = makeStyles((theme) => ({
  textfield: {
    ["& fieldset"]: {
      borderRadius: `16px`,
    },
  },
  container: {
    paddingTop: theme.spacing(10),
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  paper: {
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

const NewUser = () => {
  const classes = useStyles();
  const history = useHistory();

  const [values, setValues] = useState({
    username: "",
    email: "",
    roles: [],
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

  const onSubmit = (values, e) => {
    e.preventDefault();

    api
      .register(values)
      .then((response) => {
        successToast("Congratulations! User has been successfully created");
        history.push("/dashboard/users");
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
    <Container maxWidth="sm" className={classes.container}>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Paper component={Card} elevation={3} className={classes.paper}>
            <CardHeader title="Create User" />
            <Divider />
            <CardContent>
              <Grid container>
                <Grid item xs={12}>
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
                    className={classes.textfield}
                    onKeyPress={keypress}
                    {...register("username")}
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
                    className={classes.textfield}
                    onKeyPress={keypress}
                    {...register("email")}
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
                    className={classes.textfield}
                    onKeyPress={keypress}
                    {...register("password")}
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
                    className={classes.textfield}
                    onKeyPress={keypress}
                    {...register("confirmPassword")}
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
                </Grid>
              </Grid>
            </CardContent>
            <Divider />
            <Box className={classes.userUpdateBottom}>
              <Button
                className={classes.userUpdateButton}
                type="submit"
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
    </Container>
  );
};

export default NewUser;
