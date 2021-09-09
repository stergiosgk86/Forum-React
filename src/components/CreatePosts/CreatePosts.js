import React, { Component } from "react";
import { Form, Card, Button, ProgressBar } from "react-bootstrap";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";

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

  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
            this.props.history.push("/posts");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  resetPost = () => {
    this.setState(() => this.initialState);
  };

  postChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { title, description } = this.state;
    const { uploadPercentage } = this.state;

    return (
      <div className="container pt-5 animated fadeInUp">
        <Card className="cardBorder shadow-lg">
          <Card.Header>Add a Post</Card.Header>
          <Form onSubmit={this.submitPost} onReset={this.resetPost}>
            <Card.Body>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Tittle</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="title"
                  name="title"
                  value={title}
                  onChange={this.postChange}
                  placeholder="Enter Title"
                />
              </Form.Group>
              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="description"
                  name="description"
                  value={description}
                  onChange={this.postChange}
                  placeholder="Enter Description"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Image</Form.Label>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text">Upload</span>
                  </div>
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="imageFile"
                      onChange={this.encodeImage}
                    />
                    <label className="custom-file-label">Choose an Image</label>
                  </div>
                </div>
                {uploadPercentage > 0 && (
                  <ProgressBar
                    now={uploadPercentage}
                    label={`${uploadPercentage}%`}
                  />
                )}
              </Form.Group>
            </Card.Body>
            <Card.Footer>
              <Button variant="primary mr-2" type="submit">
                <i className="fas fa-save pr-2"></i>
                Submit
              </Button>
              <Button variant="info" type="reset">
                <i className="fas fa-undo pr-2"></i>
                Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}

export default CreatePosts;
