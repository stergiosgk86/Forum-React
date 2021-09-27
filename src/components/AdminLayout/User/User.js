import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  makeStyles,
  MenuItem,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import PublishIcon from "@material-ui/icons/Publish";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as yup from "yup";
import { api } from "../../../utils/Api";
import { successToast } from "../../Toastify/Toastify";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";

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

const schema = yup.object().shape({
  username: yup.string().trim().required("Username is required."),
  email: yup
    .string()
    .email("Email address is invalid")
    .required("Email is required."),
  password: yup.string().trim(),
  // .required("Password is required.")
  // .min(4, "The password must be at least 4 characters long."),
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, roleName, theme) {
  return {
    fontWeight:
      roleName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const User = () => {
  const [values, setValues] = useState({
    username: "",
    roles: [],
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setRoleName(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const theme = useTheme();
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState([]);
  const [role, setRole] = useState("USER");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: values,
    resolver: yupResolver(schema),
  });
  const history = useHistory();
  const classes = useStyles();

  const { id } = useParams();

  useEffect(() => {
    api
      .getRoles()
      .then(({ data }) => {
        setRoles(data);
      })
      .catch((error) => console.log(error));

    api
      .getUserById(id)
      .then(({ data }) => {
        setValue("username", data.username);
        setValue("email", data.email);
        setValue("roles", data.roles);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onSubmit = (values, e) => {
    e.preventDefault();

    const signUpRequest = Object.assign({}, values);

    api
      .updateUser(id, signUpRequest)
      .then((response) => {
        successToast("Congratulations! User has been successfully updated");
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
              <form onSubmit={handleSubmit(onSubmit)}>
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
                            {...register("username")}
                            InputLabelProps={{ shrink: true }}
                            onKeyPress={keypress}
                            error={Boolean(errors.username)}
                            helperText={errors?.username?.message}
                          />
                        </Grid>

                        {/* <Select
                          fullWidth
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          defaultValue="role"
                          value={roles}
                          {...register("roles")}
                          label="Select"
                          onChange={handleChange}
                        >
                          {roles.map((role) => (
                            <MenuItem
                              key={role}
                              value={role}
                            >
                              {role}
                            </MenuItem>
                          ))}
                        </Select> */}

                        <Grid
                          item
                          xs={12}
                          style={{ paddingTop: "15px", paddingBottom: "5px" }}
                        >
                          <FormControl style={{ width: "100%" }}>
                            <InputLabel
                              id="multiple-chip-label"
                              style={{
                                marginLeft: "15px",
                              }}
                            >
                              Chip
                            </InputLabel>
                            <Select
                              labelId="multiple-chip-label"
                              id="multiple-chip"
                              multiple
                              className={classes.textfield}
                              value={roleName}
                              onChange={handleChange}
                              input={
                                <OutlinedInput
                                  id="select-multiple-chip"
                                  label="Chip"
                                />
                              }
                              renderValue={(selected) => (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 0.5,
                                  }}
                                >
                                  {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                  ))}
                                </Box>
                              )}
                              MenuProps={MenuProps}
                            >
                              {roles.map((role) => (
                                <MenuItem
                                  key={role}
                                  value={role}
                                  style={getStyles(role, roleName, theme)}
                                >
                                  {role}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
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
                            {...register("email")}
                            InputLabelProps={{ shrink: true }}
                            onKeyPress={keypress}
                            error={Boolean(errors.email)}
                            helperText={errors?.email?.message}
                          />
                        </Grid>
                        <Grid item xs={12}>
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default User;
