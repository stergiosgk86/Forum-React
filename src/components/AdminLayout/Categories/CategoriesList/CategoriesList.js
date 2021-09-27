import React from "react";
import { makeStyles, Button, Box, Grid, Typography } from "@material-ui/core";
import { NavLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
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
  containergrid: {
    padding: 20,
  },
  categoryCreateEditButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
  },
}));

const CategoriesList = () => {
  const classes = useStyles();

  return (
    <Box>
      <Grid className={classes.header}>
        <Typography
          variant="subtitle2"
          component="h1"
          className={classes.headertitle}
        >
          Categories
        </Typography>
        <NavLink to="/dashboard/createcategories" className="navlink">
          <Button
            className={classes.categoryCreateEditButton}
            variant="contained"
            size="medium"
            color="primary"
          >
            Create Category
          </Button>
        </NavLink>
      </Grid>
    </Box>
  );
};

export default CategoriesList;
