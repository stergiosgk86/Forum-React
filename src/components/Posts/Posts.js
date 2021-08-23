import React, { Component } from "react";
import { Link } from "react-router-dom";
import { api, BASE_URL } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import moment from "moment";
import {
  withStyles,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@material-ui/core";
import "./Posts.css";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  postTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    padding: theme.spacing(1),
  },
  name: {
    fontSize: "0.9rem",
    fontWeight: 700,
    textTransform: "capitalize",
    paddingBottom: "10px",
  },
  date: {
    fontSize: "0.8rem",
    fontWeight: 500,
    opacity: 0.6,
  },
  likesComments: {
    padding: theme.spacing(1),
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  likeCommentBtn: {
    padding: theme.spacing(1),
    paddingTop: "20px",
    paddingLeft: "30px",
    paddingRight: "30px",
  },
  description: {
    padding: theme.spacing(2),
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  border: {
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
});

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      categoryId: forumSession.category.getId(),
      posts: [],
      userId: forumSession.user.getId(),
    };
    this.submitLike = this.submitLike.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    api
      .getCategoryPosts(this.state.categoryId)
      .then((res) => {
        this.setState((state) => {
          state.posts = res.data;
          state.loading = false;
          return { state };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  submitLike(postId) {
    api
      .submitLike(postId, this.state.userId)
      .then((res) => {
        if (res.status === 200) {
          this.setState((state) => {
            state.posts = [...this.state.posts].map((post) => {
              post.likes = post.id === postId ? res.data.likes : post.likes;
              return post;
            });
            return { state };
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className="text-center position-sticky fixed-top sticky">
          <Link to="/createposts" className="btn btn-grad">
            <i className="fas fa-plus-square pr-2"></i>
            Add Post
          </Link>
        </div>

        {this.state.loading && (
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

        {!this.state.loading && (
          <>
            {this.state.posts.length ? (
              <>
                {this.state.posts.map((post) => (
                  <Container
                    component={Box}
                    py={3}
                    key={post.id}
                    className="animated fadeInUp"
                    style={{ maxWidth: "750px" }}
                  >
                    <Paper className={classes.paper} elevation={10}>
                      <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        component={Box}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          component={Box}
                          className={classes.border}
                        >
                          <Typography
                            variant="inherit"
                            className={classes.postTitle}
                          >
                            {post.title}
                          </Typography>
                        </Grid>
                        <Grid container py={2} component={Box}>
                          <Grid
                            item
                            component={Box}
                            borderRadius="50%"
                            className="user-photo"
                          ></Grid>
                          <Grid item component={Box}>
                            <Grid container component={Box} px={2}>
                              <Grid
                                container
                                component={Box}
                                className={classes.name}
                              >
                                {post.username}
                              </Grid>
                              <Grid
                                container
                                component={Box}
                                className={classes.date}
                              >
                                {moment(post.dateCreated).format(
                                  "MMMM D,YYYY, h:mm:ss a"
                                )}
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          component={Box}
                          justifyContent="flex-start"
                          className={classes.description}
                        >
                          <Typography variant="body2">
                            {post.description}
                          </Typography>
                        </Grid>
                        <Grid item>
                          {post.imageUrl ? (
                            <img
                              alt=""
                              async
                              src={`${BASE_URL}/${post.imageUrl}`}
                            />
                          ) : (
                            ""
                          )}
                        </Grid>
                        <Grid
                          container
                          component={Box}
                          justifyContent="space-between"
                          className={classes.likesComments}
                        >
                          <Typography variant="body2">
                            {post.likes} <i className="fas fa-heart"></i>
                          </Typography>
                          <Link
                            to="/comments"
                            onClick={() => {
                              forumSession.post.saveId(post.id);
                            }}
                            className="likeCommentBtn"
                          >
                            <Typography variant="body2">
                              {post.numComments} Comments
                            </Typography>
                          </Link>
                        </Grid>
                        <Grid
                          container
                          component={Box}
                          justifyContent="space-between"
                          className={classes.likeCommentBtn}
                        >
                          <Typography
                            variant="inherit"
                            className="likeCommentBtn"
                            onClick={() => {
                              this.submitLike(post.id);
                            }}
                          >
                            <i className="far fa-thumbs-up"></i> Like
                          </Typography>
                          <Link
                            to="/comments"
                            onClick={() => {
                              forumSession.post.saveId(post.id);
                            }}
                            className="likeCommentBtn"
                          >
                            <Typography
                              variant="inherit"
                              className="likeCommentBtn"
                            >
                              <i className="far fa-comment"></i> Comment
                            </Typography>
                          </Link>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Container>
                ))}
              </>
            ) : (
              <div
                className="container d-flex flex-column align-items-center justify-content-center"
                style={{ minHeight: "800px" }}
              >
                <h1 className="d-flex align-items-center font-italic animated bounce">
                  No Posts!!!
                </h1>
              </div>
            )}
          </>
        )}
      </>
    );
  }
}

export default withStyles(styles)(Posts);
