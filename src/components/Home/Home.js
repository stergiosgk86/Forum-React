import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import moment from "moment";
import Pagination from "../Pagination/Pagination";
import {
  makeStyles,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Hidden,
  Dialog,
  CircularProgress,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import "./Home.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(5);

  useEffect(() => {
    setLoading(true);
    api
      .getCategories()
      .then((res) => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //Get current categories
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );

  //Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      borderRadius: 10,
    },
    header: {
      padding: theme.spacing(3),
      backgroundImage: `radial-gradient(circle, rgba(2,0,43,1) 0%, rgba(58,58,185,1) 50%, rgba(102,181,198,1) 100%)`,
      color: "#fff",
      borderRadius: 10,
      textTransform: "uppercase",
    },
    description: {
      opacity: 0.5,
    },
    border: {
      borderRight: "2px solid rgba(0, 0, 0, 0.05)",
    },
    bold: {
      fontSize: "1rem",
      fontWeight: 700,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <div className="forum-image"></div>
      <Container
        maxWidth="lg"
        fixed={true}
        component={Box}
        p={2}
        className="animated fadeInUp"
      >
        <Paper className={classes.header}>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" className={classes.bold}>
                Forum
              </Typography>
            </Grid>
            <Hidden smDown>
              <Grid container item xs={6}>
                <Grid
                  container
                  item
                  xs={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  component={Box}
                >
                  <Typography variant="h6" className={classes.bold}>
                    Posts
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  component={Box}
                >
                  <Typography variant="h6" className={classes.bold}>
                    Comments
                  </Typography>
                </Grid>
                <Grid
                  container
                  item
                  xs={6}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  component={Box}
                >
                  <Typography variant="h6" className={classes.bold}>
                    Last Comment
                  </Typography>
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Paper>
      </Container>

      {loading && (
        <Dialog
          open
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Grid
            container
            component={Box}
            justifyContent="center"
            alignItems="center"
          >
            <DialogContent>
              <CircularProgress color="inherit" />
            </DialogContent>
            <DialogTitle id="alert-dialog-title">Please wait...</DialogTitle>
          </Grid>
        </Dialog>
      )}
      {!loading && (
        <>
          {currentCategories.map((category) => (
            <Container
              maxWidth="lg"
              fixed={true}
              component={Box}
              pb={2}
              key={category.id}
              className="animated fadeInUp"
            >
              <Paper className={classes.paper} elevation={10}>
                <Grid container>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    component={Box}
                    className={classes.border}
                    className="seperate"
                  >
                    <Typography variant="h5" noWrap={true}>
                      <Link
                        to="/posts"
                        onClick={() =>
                          forumSession.category.saveId(category.id)
                        }
                        className="link text-decoration-none"
                      >
                        {category.title}
                      </Link>
                    </Typography>
                    <Typography
                      className={classes.description}
                      variant="subtitle1"
                      noWrap={true}
                    >
                      {category.description}
                    </Typography>
                  </Grid>
                  <Hidden smDown>
                    <Grid container item xs={6}>
                      <Grid
                        container
                        item
                        xs={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        component={Box}
                        className={classes.border}
                      >
                        <Typography variant="h6">
                          {category.numPosts}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={3}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        component={Box}
                        className={classes.border}
                      >
                        <Typography variant="h6">
                          {category.numComments}
                        </Typography>
                      </Grid>
                      <Grid
                        container
                        item
                        xs={6}
                        display="flex"
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        component={Box}
                      >
                        {category.lastComment ? (
                          <>
                            <Grid item>
                              <Typography
                                className={classes.description}
                                variant="subtitle1"
                              >
                                {moment(
                                  category?.lastComment?.dateCreated
                                ).fromNow()}
                              </Typography>
                            </Grid>
                            <Grid item>
                              <Typography
                                className="text-capitalize"
                                variant="h6"
                              >
                                {category?.lastComment?.username}
                              </Typography>
                            </Grid>
                          </>
                        ) : (
                          <Grid
                            container
                            item
                            xs={8}
                            display="flex"
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            component={Box}
                          >
                            <Typography variant="h6" align="center">
                              No Comments
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                  </Hidden>
                </Grid>
              </Paper>
            </Container>
          ))}
        </>
      )}
      <Container
        className="animated fadeInUp"
        maxWidth="lg"
        fixed={true}
        component={Box}
        pb={2}
      >
        <Pagination
          categoriesPerPage={categoriesPerPage}
          totalCategories={categories.length}
          paginate={paginate}
        />
      </Container>
      <Container maxWidth="lg" fixed={true} component={Box} pb={3}>
        <Link
          to="/createcategories"
          className="text-decoration-none btn btn-grad"
        >
          Add Category
        </Link>
      </Container>
    </>
  );
};

export default Home;
