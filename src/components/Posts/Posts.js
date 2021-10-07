import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
  Avatar,
  Button,
  Divider,
} from "@material-ui/core";
import "./Posts.css";
import AuthenticationService from "../security/AuthenticationService";
import { CameraAlt } from "@material-ui/icons";
import SkeletonPosts from "../Skeletons/SkeletonPosts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddBoxIcon from "@mui/icons-material/AddBox";
import UserService from "../../utils/UserService";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  customButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  avatar: {
    display: "flex",
    alignItems: "center",
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
    fontSize: "0.7rem",
    fontWeight: 500,
    opacity: 0.6,
  },
  likeCommentBtn: {
    padding: theme.spacing(1),
  },
  boxbtn: {
    alignItems: "center",
    display: "flex",
    fontWeight: 500,
  },
  description: {
    padding: theme.spacing(2),
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
      username: AuthenticationService.getLoggedInUserName(),
    };
    this.submitLike = this.submitLike.bind(this);
  }

  componentDidMount() {
    api
      .getCategoryPosts(this.state.categoryId)
      .then((res) => {
        this.setState((state) => {
          state.posts = res.data;
          state.loading = false;
          return { state };
        });
      })
      .catch((err) => {});
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
      .catch((err) => {});
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <div className="text-center position-sticky fixed-top sticky">
          <NavLink to="/createposts" className="navlink">
            <Button
              className={classes.customButton}
              variant="contained"
              size="large"
              color="primary"
              startIcon={<AddBoxIcon />}
            >
              Create Post
            </Button>
          </NavLink>
        </div>

        {this.state.loading ? (
          <SkeletonPosts />
        ) : (
          <>
            {this.state.posts.length ? (
              <>
                {this.state.posts.map((post) => (
                  <Container
                    component={Box}
                    py={3}
                    key={post.id}
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
                        <Grid container justifyContent="center" component={Box}>
                          <Typography
                            variant="inherit"
                            className={classes.postTitle}
                          >
                            {post.title}
                          </Typography>
                        </Grid>
                        <Divider variant="fullWidth" component="legend" />
                        <Grid container py={2} component={Box}>
                          <Grid className={classes.avatar}>
                            <Avatar alt="" src="">
                              {post.username}
                            </Avatar>
                          </Grid>
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
                                  "MMMM D, YYYY [at] h:mm A"
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
                            <LazyLoadImage
                              alt=""
                              effect="blur"
                              src={`${BASE_URL}/${post.imageUrl}`}
                            />
                          ) : (
                            ""
                          )}
                        </Grid>
                        <Divider variant="fullWidth" component="legend" />
                        <Grid
                          container
                          component={Box}
                          justifyContent="space-between"
                        >
                          <Button
                            className="likeCommentBtn"
                            onClick={() => {
                              this.submitLike(post.id);
                              post.hasLikeByLoggedInUser =
                                !post.hasLikeByLoggedInUser;
                            }}
                          >
                            <Typography variant="body2">
                              {post.likes}
                              {post.hasLikeByLoggedInUser ? (
                                <FavoriteIcon color="error" />
                              ) : (
                                <FavoriteBorderIcon />
                              )}
                            </Typography>
                          </Button>
                          <Button
                            component={NavLink}
                            className="likeCommentBtn"
                            to="/comments"
                            onClick={() => {
                              forumSession.post.saveId(post.id);
                            }}
                          >
                            <Box className={classes.boxbtn}>
                              {post.numComments}
                              <Box style={{ marginLeft: "5px" }}>Comments</Box>
                            </Box>
                          </Button>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Container>
                ))}
              </>
            ) : (
              <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                component={Box}
                style={{ minHeight: "700px" }}
              >
                <Grid item>
                  <CameraAlt style={{ fontSize: 200 }} />
                </Grid>
                <Grid item>
                  <Typography variant="h3">No Posts Yet</Typography>
                </Grid>
              </Grid>
            )}
          </>
        )}
      </>
    );
  }
}

export default withStyles(styles)(Posts);
