import React, { Component } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { NavLink } from "react-router-dom";
import { api } from "../../utils/Api";

const styles = (theme) => ({
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
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue,
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const signUpRequest = Object.assign({}, this.state);

    api
      .register(signUpRequest)
      .then((response) => {
        // Alert.success("You're successfully registered. Please login to continue!");
        this.props.history.push("/login");
      })
      .catch((error) => {
        // Alert.error((error && error.message) || 'Oops! Something went wrong. Please try again!');
      });
  }

  render() {
    const { classes } = this.props;
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
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              label="Username"
              name="username"
              autoComplete="off"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={this.state.email}
              onChange={this.handleInputChange}
              type="email"
              label="Email"
              name="email"
              autoComplete="off"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              autoComplete="current-password"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Register
            </Button>
            <Grid container>
              <Grid item xs>
                <div className="login-link">
                  Already have an account?
                  <NavLink to="/login" variant="body2">
                    Login!
                  </NavLink>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Box mt={8}></Box>
      </Container>
    );
  }
}

export default withStyles(styles)(Register);
