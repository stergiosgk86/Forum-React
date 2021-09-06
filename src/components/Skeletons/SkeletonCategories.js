import React from "react";
import { Box, Container, Grid, makeStyles } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const SkeletonCategories = () => {
  const useStyles = makeStyles(() => ({
    media: {
      height: 90,
      borderRadius: 10,
    },
  }));

  const classes = useStyles();

  return (
    <Container maxWidth="lg" fixed={true} component={Box}>
      <Grid component={Box} pb={2}>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      </Grid>
      <Grid component={Box} pb={2}>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      </Grid>
      <Grid component={Box} pb={2}>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      </Grid>
    </Container>
  );
};

export default SkeletonCategories;
