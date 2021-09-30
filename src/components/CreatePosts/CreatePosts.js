import React, { Component } from "react";
import { ProgressBar } from "react-bootstrap";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";
import { successToast } from "../Toastify/Toastify";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  withStyles,
  Paper,
  TextField,
} from "@material-ui/core";
import BackupIcon from "@mui/icons-material/Backup";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";

const styles = (theme) => ({
  textfield: {
    ["& fieldset"]: {
      borderRadius: `16px`,
    },
  },
  container: {
    paddingTop: theme.spacing(10),
  },
  paper: {
    borderRadius: theme.spacing(2),
  },
  boxImage: {
    paddingTop: theme.spacing(2),
  },
  cardBottom: {
    padding: theme.spacing(2),
    display: "flex",
    justifyContent: "end",
  },
  customButton: {
    outline: "none!important",
    textTransform: "none!important",
    borderRadius: theme.spacing(2),
    backgroundColor: "rgb(86, 100, 210)",
    color: "white",
  },
});

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
    uploadPercentage: 0,
    title: "",
    description: "",
    image: {
      data: null,
      name: null,
    },
    userId: forumSession.user.getId(),
  };

  encodeImage = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState((state) => {
          state.image = {
            data: reader.result,
            name: file.name,
          };
          return { state };
        });
      };
    }
  };

  submitPost = (event) => {
    event.preventDefault();

    const categoryId = forumSession.category.getId();
    const post = {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      userId: this.state.userId,
    };

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);

        if (percent < 100) {
          this.setState({ uploadPercentage: percent });
        }
      },
    };

    api
      .savePost(categoryId, post, options)
      .then((res) => {
        this.setState({ uploadPercentage: 100 }, async () => {
          await this.delay(1000);
          this.setState({ uploadPercentage: 0 });
          if (res.data) {
            successToast(
              "Congratulations! Your Post has been successfully created."
            );
            this.props.history.push("/posts");
          }
        });
      })
      .catch((err) => {});
  };

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  postChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  keypress = (e) => {
    if (e.key === "Enter") {
    }
  };

  resetForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { uploadPercentage } = this.state;
    const { classes } = this.props;

    return (
      <Container maxWidth="sm" className={classes.container}>
        <div>
          <form
            onSubmit={this.submitPost}
            onReset={this.resetForm}
            autoComplete="off"
          >
            <Paper component={Card} elevation={3} className={classes.paper}>
              <CardHeader title="Create Post" />
              <Divider />
              <CardContent>
                <Grid container>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="Title"
                      placeholder="Enter Title"
                      name="title"
                      type="text"
                      variant="outlined"
                      margin="normal"
                      className={classes.textfield}
                      onKeyPress={this.keypress}
                      onChange={this.postChange}
                      // {...register("title")}
                      // error={Boolean(errors.title)}
                      // helperText={errors?.title?.message}
                    />
                    <TextField
                      fullWidth
                      autoComplete="off"
                      label="Description"
                      placeholder="Enter Description"
                      name="description"
                      type="text"
                      variant="outlined"
                      margin="normal"
                      className={classes.textfield}
                      onKeyPress={this.keypress}
                      onChange={this.postChange}
                      // {...register("description")}
                      // error={Boolean(errors.description)}
                      // helperText={errors?.description?.message}
                    />

                    <Box className={classes.boxImage}>
                      <div>
                        <input type="file" className="upload-box" />
                      </div>
                      <Box pt={2}>
                        {uploadPercentage > 0 && (
                          <ProgressBar
                            animated
                            now={uploadPercentage}
                            label={`${uploadPercentage}%`}
                          />
                        )}
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>

              <Divider />
              <Box className={classes.cardBottom}>
                <Button
                  className={classes.customButton}
                  type="submit"
                  variant="contained"
                  size="medium"
                  color="primary"
                  startIcon={<BackupIcon />}
                >
                  Submit
                </Button>
                <Button
                  className="userListDelete"
                  variant="contained"
                  size="medium"
                  color="secondary"
                  onClick={this.resetForm}
                  startIcon={<RotateLeftIcon />}
                >
                  Reset
                </Button>
              </Box>
            </Paper>
          </form>
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(CreatePosts);
