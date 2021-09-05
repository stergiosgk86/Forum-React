import React, { Component } from "react";
import { api, BASE_URL } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import moment from "moment";
import "./Comments.css";
import SendIcon from "@material-ui/icons/Send";
import {
  withStyles,
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Badge,
} from "@material-ui/core";
import AuthenticationService from "../security/AuthenticationService";
import { Favorite } from "@material-ui/icons";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
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
    marginBottom: 10,
  },
  commentBubble: {
    borderRadius: 15,
  },
  commentCreated: {
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
    fontSize: "0.8rem",
    fontWeight: 500,
    opacity: 0.6,
  },
  likesComments: {
    padding: theme.spacing(1),
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  description: {
    padding: theme.spacing(2),
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  border: {
    borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
  },
  textarea: {
    resize: "both",
  },
});

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: forumSession.post.getId(),
      comments: [],
      userId: forumSession.user.getId(),
      post: {},
      username: AuthenticationService.getLoggedInUserName(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.keypress = this.keypress.bind(this);
    this.submitComment = this.submitComment.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    api
      .getPostComments(this.state.postId)
      .then((res) => {
        this.setState((state) => {
          state.post = res.data.post;
          state.comments = res.data.comments;
          state.likes = res.data.likes;
          state.numComments = res.data.numComments;
          return { state };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  keypress(e) {
    if (e.key === "Enter") {
      e.preventDefault();

      this.submitComment();
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  submitComment() {
    api
      .saveComment(this.state.postId, {
        text: this.state.text,
        userId: this.state.userId,
      })
      .then((res) => {
        this.setState((state) => {
          state.comments = [...this.state.comments, res.data];
          state.numComments++;
          state.text = "";
          return state;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <>
        <Container
          component={Box}
          py={3}
          key={this.state.post.id}
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
                <Typography variant="inherit" className={classes.postTitle}>
                  {this.state.post.title}
                </Typography>
              </Grid>
              <Grid container py={2} component={Box}>
                <Grid className={classes.avatar}>
                  <Avatar
                    alt=""
                    src=""
                  >{this.state.post.username?.charAt(0)}</Avatar>
                </Grid>
                <Grid item component={Box}>
                  <Grid container component={Box} px={2}>
                    <Grid container component={Box} className={classes.name}>
                      {this.state.post.username}
                    </Grid>
                    <Grid container component={Box} className={classes.date}>
                      {moment(this.state.post.dateCreated).format(
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
                  {this.state.post.description}
                </Typography>
              </Grid>
              <Grid item>
                {this.state.post.imageUrl ? (
                  <LazyLoadImage alt="" effect="blur" src={`${BASE_URL}/${this.state.post.imageUrl}`} />
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
                  {this.state.likes} <Favorite color="error" />
                </Typography>

                <Typography variant="body2">
                  {this.state.numComments} Comments
                </Typography>
              </Grid>

              <Grid
                container
                justifyContent="flex-start"
                alignItems="center"
                component={Box}
                py={2}
              >
                <Grid item xs={2} sm={1}>
                  <StyledBadge
                    overlap="circle"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    variant="dot"
                  >
                    <Avatar
                      alt=""
                      src=""
                    >{this.state.username.charAt(0)}</Avatar>
                  </StyledBadge>
                </Grid>

                <Grid item xs={10} sm={11}>
                  <TextField
                    multiline
                    variant="standard"
                    fullWidth
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={this.submitComment}
                            className={classes.sendBtn}
                          >
                            <SendIcon color="primary" />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    aria-label="empty textarea"
                    placeholder="Write a comment..."
                    value={this.state.text}
                    onKeyPress={this.keypress}
                    onChange={this.handleChange}
                    name="text"
                  />
                </Grid>
              </Grid>

              {this.state.comments.map((comment) => (
                <Grid container key={comment.id} className={classes.chat}>
                  <Grid item xs={2} sm={1} className={classes.avatar}>
                    <Avatar
                      alt=""
                      src=""
                    >{comment.username.charAt(0)}</Avatar>
                  </Grid>
                  <Grid item xs={10} sm={11}>
                    <Card elevation={2} className={classes.commentBubble}>
                      <CardActionArea>
                        <CardContent>
                          <Typography className={classes.nameBubble}>
                            {comment.username}
                          </Typography>

                          <Typography
                            gutterBottom
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {comment.text}
                          </Typography>

                          <Typography
                            variant="caption"
                            className={classes.commentCreated}
                          >
                            {moment(comment.dateCreated).format(
                              "MMMM D,YYYY, h:mm:ss a"
                            )}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(Comments);
