import React, { useState, useEffect } from "react";
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
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import "./App.css";
// import DarkModeBtn from "./components/DarkModeBtn/DarkModeBtn";


function App() {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode"));

  const theme = createMuiTheme({
    palette: {
      type: darkMode ,
    },
  });

  useEffect(() => {
    if (darkMode === "dark") {
      setDarkMode("dark");
    } else {
      setDarkMode("light");
    }
  });

  return (
    // <ThemeProvider theme={theme}>
      <Paper className="page-container">
        <div className="content-wrap">
          <Scrolltopbtn />
          <Navigationbar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/createcategories"
              exact
              component={CreateCategories}
            />
            <Route path="/createposts" exact component={CreatePosts} />
            <Route path="/posts" exact component={Posts} />
            <Route path="/comments" exact component={Comments} />
            <Route component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Paper>
    // </ThemeProvider>
  );
}

export default App;
