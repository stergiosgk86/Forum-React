import React from "react";
import { CssBaseline, Paper } from "@material-ui/core";
import Footer from "../Footer/Footer";
import Scrolltopbtn from "../Scrolltopbtn/Scrolltopbtn";
import ScrollToTop from "../ScrollToTop/ScrollToTop";

const ForumLayout = (props) => {
  return (
    <Paper className="page-container">
      <ScrollToTop />
      <CssBaseline />
      <div className="content-wrap">
        <Scrolltopbtn />
        {props.children}
      </div>
      <Footer />
    </Paper>
  );
};

export default ForumLayout;
