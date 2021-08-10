import React from "react";
import { Switch, Route } from "react-router-dom";
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
import AuthenticatedRoute from "./components/security/AuthenticatedRoute";

function App() {

  return (
      <Paper className="page-container">
        <div className="content-wrap">
          <Scrolltopbtn />
          <Navigationbar />
          <Switch>
            <AuthenticatedRoute path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <AuthenticatedRoute
              path="/createcategories"
              exact
              component={CreateCategories}
            />
            <AuthenticatedRoute path="/createposts" exact component={CreatePosts} />
            <AuthenticatedRoute path="/posts" exact component={Posts} />
            <AuthenticatedRoute path="/comments" exact component={Comments} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Paper>
  );
}

export default App;
