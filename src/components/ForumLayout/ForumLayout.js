import { CssBaseline, Paper } from "@material-ui/core";
import React, { useState } from "react";
import Footer from "../Footer/Footer";
import Navigationbar from "../Navigationbar/Navigationbar";
import Scrolltopbtn from "../Scrolltopbtn/Scrolltopbtn";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
import AuthenticationService from "../security/AuthenticationService";

const ForumLayout = (props) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(
    AuthenticationService.isUserLoggedIn()
  );
  const updateIsUserLoggedIn = (isLoggedIn) => {
    setIsUserLoggedIn(isLoggedIn);
  };
  return (
    <Paper className="page-container">
      <ScrollToTop />
      <CssBaseline />
      <div className="content-wrap">
        <Scrolltopbtn />
        <Navigationbar
          isUserLoggedIn={isUserLoggedIn}
          updateIsUserLoggedIn={updateIsUserLoggedIn}
        />
        {props.children}
        <Footer />
      </div>
    </Paper>
  );
};

export default ForumLayout;
