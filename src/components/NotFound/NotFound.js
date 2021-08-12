import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Container, Typography } from "@material-ui/core";

const NotFound = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Typography
              component="h1"
              variant="h4"
              align="center"
              className="pt-4"
              gutterBottom
            >
              Admin Area <small>404 Page Not Found Error</small>
            </Typography>
          </div>
        </div>
      </div>

      <div className="container text-center">
        <img src="https://rivernetcomputers.com/wp-content/uploads/2017/12/404error.png" />
        <Container maxWidth="lg" fixed={true} component={Box} py={3}>
          <NavLink to="/" className="text-decoration-none btn btn-grad">
            HOMEPAGE
          </NavLink>
        </Container>
      </div>
    </>
  );
};

export default NotFound;
