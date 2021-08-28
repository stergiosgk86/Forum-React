import React, { Component } from "react";
import { api, BASE_URL } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import moment from "moment";
import "./Comments.css";
import SendIcon from '@material-ui/icons/Send';
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
} from "@material-ui/core";


const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    borderRadius: 10,
  },
  nameBubble: {
    fontSize: "0.9rem",
    fontWeight: 700,
    textTransform: "capitalize",
  },
  commentBubble: {
    padding: theme.spacing(1),
    backgroundColor: '#F2F3F5',
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
    resize: "both"
  }
});

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: forumSession.post.getId(),
      comments: [],
      userId: forumSession.user.getId(),
      post: {},
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
                // className="animated fadeInUp"
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
                        {this.state.post.title}
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
                            {this.state.post.username}
                          </Grid>
                          <Grid
                            container
                            component={Box}
                            className={classes.date}
                          >
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
                        <img
                          alt=""
                          src={`${BASE_URL}/${this.state.post.imageUrl}`}
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
                        {this.state.likes} <i className="fas fa-heart"></i>
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
                pt={1}
                >

                <Grid item xs={2} sm={1}>
                      <Grid
                        item
                        component={Box}
                        borderRadius="50%"
                        className="user-photo"
                      ></Grid>
                </Grid>
                 
                <Grid item xs={10} sm={11}>
                <TextField
                  multiline
                  variant="standard"
                  fullWidth
                  size="small"
                  InputProps={{
                    endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={this.submitComment} className={classes.sendBtn}>
                        <SendIcon color="primary" />
                      </IconButton>
                    </InputAdornment>
                  ) }}
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

                  <Grid container item xs={12} key={comment.id} component={Box} pt={3}>

                  <Grid
                    item
                    xs={1}
                    component={Box}
                    borderRadius="50%"
                    className="user-photo"
                    >
                  </Grid>

                  <Grid item xs={11} className={classes.commentBubble}>
                    <Grid item>
                      <Typography className={classes.nameBubble}>
                        {comment.username}
                      </Typography>
                    </Grid>
                    <Grid item style={{wordWrap: "break-word"}}>
                      {comment.text}
                      </Grid>
                  </Grid>

                  </Grid>

              ))}

                  </Grid>
                </Paper>
              </Container>



        
                {/* <Grid container>
                  <Grid item sm={1}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                  </Grid>
                  <Grid item sm={11}>
                    <Card>
                      <CardActionArea>
                        <CardContent>
                          <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Cum ut voluptate maiores, dolores voluptates nostrum eos ullam, neque, tempore minus sed! Voluptas sit 
                            facilis nobis numquam sed debitis doloribus cum!
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                </Grid> */}
        
      </>
    );
  }
}

export default withStyles(styles)(Comments);
