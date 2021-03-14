import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { api } from "../../utils/Api";
import { forumSession } from "../../utils/SessionStorage";

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
  }

  initialState = {
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

    api
      .savePost(categoryId, post)
      .then((response) => {
        if (response.data) {
          this.props.history.push("/posts");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
