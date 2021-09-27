import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
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
} from "@material-ui/core";
import "./Posts.css";
import AuthenticationService from "../security/AuthenticationService";
import { CameraAlt } from "@material-ui/icons";
import ThumbUpOutlinedIcon from "@material-ui/icons/ThumbUpOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import SkeletonPosts from "../Skeletons/SkeletonPosts";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
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
  likesComments: {
    padding: theme.spacing(1),
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  likeCommentBtn: {
    padding: theme.spacing(1),
  },
  boxbtn: {
    alignItems: "center",
    display: "flex",
    fontWeight: 700,
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
      .catch((err) => {
        // console.log(err);
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
                          <Grid className={classes.avatar}>
                            <Avatar alt="" src="">
                              {post.username.charAt(0)}
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
                        <Grid
                          container
                          component={Box}
                          justifyContent="space-between"
                          className={classes.likesComments}
                        >
                          <Typography variant="body2">
                            {post.likes}
                            {post.hasLikeByLoggedInUser ? (
                              <FavoriteIcon color="error" />
                            ) : (
                              <FavoriteBorderIcon />
                            )}
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
                          <Button
                            className="likeCommentBtn"
                            onClick={() => {
                              this.submitLike(post.id);
                              post.hasLikeByLoggedInUser =
                                !post.hasLikeByLoggedInUser;
                            }}
                          >
                            <Box className={classes.boxbtn}>
                              <ThumbUpOutlinedIcon />
                              <Box style={{ marginLeft: "5px" }}>Like</Box>
                            </Box>
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
                              <ChatBubbleOutlineOutlinedIcon />
                              <Box style={{ marginLeft: "5px" }}>Comment</Box>
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
