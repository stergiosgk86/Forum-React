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
    userId: "5247",
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
      userId: "292",
    };

    api
      .savePost(categoryId, post)
      .then((response) => {
        if (response.data != null) {
          this.setState(this.initialState);
          //   alert("Category Saved Successfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.history.push("/posts");
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
      <div className="container pt-5">
        <Card>
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
                <input type="file" id="imageFile" onChange={this.encodeImage} />
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
        {/* <div>
          <input type="file" onChange={this.handleImage} />
        </div> */}
      </div>
    );
  }
}

export default CreatePosts;
