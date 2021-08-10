import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
// import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { NavLink } from "react-router-dom";
import AuthenticationService from '../security/AuthenticationService';


const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            username : "",
            password : "",
            hasLoginFailed:false,
            showSuccessMessage:false
        }
       
        this.handleChange = this.handleChange.bind(this);
        this.loginClicked = this.loginClicked.bind(this);
    }

        //generic event to handle change
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    loginClicked(){ 

        AuthenticationService.executeJwtAuthenticationService(this.state.username, this.state.password)
        .then(
            (res)=>{
                AuthenticationService.registerSuccessfulLoginForJwt(this.state.username,res.data.token );
                this.props.history.push(`/`);
            }
        ).catch(
            ()=>{
                this.setState({
                hasLoginFailed:true,
                showSuccessMessage:false
                });
            }
        )        

    }
    
render(){
    const {classes} = this.props;
  return (
    <Container component="main" maxWidth="xs">
      {/* <CssBaseline /> */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <div className={classes.form}>
            {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid credentials!</div>}
            {this.state.showSuccessMessage && <div>Login Succeed!</div>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            value={this.state.username}
            onChange={this.handleChange}
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
            name="password"
            label="Password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.loginClicked}
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
                {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        {/* <Copyright /> */}
      </Box>
    </Container>
  );
}
}
export default withStyles(styles) (Login);