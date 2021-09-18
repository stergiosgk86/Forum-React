import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import Home from "./components/Home/Home";
import CreateCategories from "./components/CreateCategories/CreateCategories";
import CreatePosts from "./components/CreatePosts/CreatePosts";
import Posts from "./components/Posts/Posts";
import Comments from "./components/Comments/Comments";
import Navigationbar from "./components/Navigationbar/Navigationbar";
import NotFound from "./components/NotFound/NotFound";
import Scrolltopbtn from "./components/Scrolltopbtn/Scrolltopbtn";
import Footer from "./components/Footer/Footer";
import Paper from "@material-ui/core/Paper";
import "./App.css";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import AuthenticatedRoute from "./components/security/AuthenticatedRoute";
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthenticationService from "./components/security/AuthenticationService";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Dashboard from "./components/Dashboard/Dashboard";
import UserList from "./components/Dashboard/UserList/UserList";
import User from "./components/Dashboard/User/User";

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    AuthenticationService.isUserLoggedIn()
  );
  const updateIsUserLoggedIn = (isLoggedIn) => {
    setIsUserLoggedIn(isLoggedIn);
  };
  const history = useHistory();

  return (
    <Paper className="page-container">
      <ScrollToTop />
      <CssBaseline />
      <div className="content-wrap">
        <Scrolltopbtn />

        {history.location.pathname === "/dashboard" ||
        history.location.pathname === "/dashboard/users" ? null : (
          <Navigationbar
            isUserLoggedIn={isUserLoggedIn}
            updateIsUserLoggedIn={updateIsUserLoggedIn}
          />
        )}

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/dashboard/users" exact component={UserList} />
          <Route path="/dashboard/user/:id" exact component={User} />
          <Route
            path="/login"
            exact
            component={() => (
              <Login updateIsUserLoggedIn={updateIsUserLoggedIn} />
            )}
          />
          <Route path="/register" exact component={Register} />
          <AuthenticatedRoute
            path="/createcategories"
            exact
            component={CreateCategories}
          />
          <AuthenticatedRoute
            path="/createposts"
            exact
            component={CreatePosts}
          />
          <AuthenticatedRoute path="/posts" exact component={Posts} />
          <AuthenticatedRoute path="/comments" exact component={Comments} />
          <Route component={NotFound} />
        </Switch>
      </div>
      {history.location.pathname === "/dashboard" ||
      history.location.pathname === "/dashboard/users" ? null : (
        <Footer />
      )}
    </Paper>
  );
};

export default App;
