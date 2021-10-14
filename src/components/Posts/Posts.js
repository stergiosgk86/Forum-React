import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  Container,
  Divider,
  Grid,
  makeStyles,
  Paper,
  Typography,
} from "@material-ui/core";
import { CameraAlt } from "@material-ui/icons";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { NavLink } from "react-router-dom";
import { api, BASE_URL } from "../../utils/Api";
import { handleAvararOfPostAndComments } from "../../utils/AvatarUtils";
import { forumSession } from "../../utils/SessionStorage";
import ColapseComments from "../ColapseComments/ColapseComments";
import SkeletonPosts from "../Skeletons/SkeletonPosts";
import "./Posts.css";

const useStyles = makeStyles((theme) => ({
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
  cardActionArea: {
    outline: "none!important",
  },
  chat: {
    paddingTop: theme.spacing(2),
  },
  avatar: {
    display: "flex",
    alignItems: "center",
  },
  nameBubble: {
    fontSize: "0.9rem",
    fontWeight: 700,
    textTransform: "capitalize",
  },
  commentBubble: {
    borderRadius: 15,
  },
  commentCreated: {
    fontSize: "0.7rem",
    display: "flex",
    justifyContent: "flex-end",
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
  sendBtn: {
    outline: "none!important",
  },
  date: {
    fontSize: "0.7rem",
    fontWeight: 500,
    opacity: 0.6,
  },
  likesComments: {
    padding: theme.spacing(1),
  },
  description: {
    padding: theme.spacing(2),
  },
  textarea: {
    resize: "both",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  collapse: {
    width: "100%",
  },
  cardActionArea: {
    outline: "none!important",
  },
}));

const Posts = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  const userId = forumSession.user.getId();
  const categoryId = forumSession.category.getId();
  const classes = useStyles();

  useEffect(() => {
    api
      .getCategoryPosts(categoryId)
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {});
  }, []);

  const submitLike = (postId) => {
    api
      .submitLike(postId, userId)
      .then((res) => {
        if (res.status === 200) {
          const newPosts = posts.map((post) => {
            post.likes = post.id === postId ? res.data.likes : post.likes;
            return post;
          });
          setPosts(newPosts);
        }
      })
      .catch((err) => {});
  };

  const showComments = (post) => {
    const newPosts = posts.map((p) => {
      if (p.id === post.id) {
        p["showComments"] = p["showComments"] ? !p["showComments"] : true;
      }
      return p;
    });
    setPosts(newPosts);
  };

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

      {loading ? (
        <SkeletonPosts />
      ) : (
        <>
          {posts.length ? (
            <>
              {posts.map((post) => (
                <Container
                  component={Box}
                  py={3}
                  key={post.id}
                  style={{ maxWidth: "750px" }}
                >
                  <Paper
                    className={classes.paper}
                    elevation={10}
                    component={Card}
                  >
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
                          <Avatar
                            alt=""
                            src={handleAvararOfPostAndComments(user, post)}
                          />
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
                      <CardActionArea className={classes.cardActionArea}>
                        <Grid item>
                          {post.imageUrl ? (
                            <LazyLoadImage
                              alt=""
                              effect="blur"
                              src={`${BASE_URL}/${post.imageUrl}`}
                              onDoubleClick={() => {
                                submitLike(post.id);
                                post.hasLikeByLoggedInUser =
                                  !post.hasLikeByLoggedInUser;
                              }}
                            />
                          ) : (
                            ""
                          )}
                        </Grid>
                      </CardActionArea>
                      <Divider variant="fullWidth" component="legend" />
                      <Grid
                        container
                        component={Box}
                        justifyContent="space-between"
                      >
                        <Button
                          className="likeCommentBtn"
                          onClick={() => {
                            submitLike(post.id);
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
                          className="likeCommentBtn"
                          onClick={() => showComments(post)}
                        >
                          <Box className={classes.boxbtn}>
                            {post.numComments}
                            <Box style={{ marginLeft: "5px" }}>Comments</Box>
                          </Box>
                        </Button>
                      </Grid>
                      {post.showComments ? (
                        <ColapseComments
                          user={user}
                          post={post}
                          posts={posts}
                          setPosts={setPosts}
                        />
                      ) : (
                        ""
                      )}
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
};

export default Posts;
