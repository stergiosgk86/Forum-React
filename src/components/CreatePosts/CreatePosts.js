import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { api } from "../../utils/Api";

class CreatePosts extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    // this.handleImage = this.handleImage.bind(this);
    this.postChange = this.postChange.bind(this);
    this.submitPost = this.submitPost.bind(this);
  }

  initialState = {
    title: "",
    description: "",
    image: null,
    userId: "5247",
  };

  submitPost = (event) => {
    event.preventDefault();

    const post = {
      title: this.state.title,
      description: this.state.description,
    };

    api
      .savePost(post)
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

//   handleImage(event) {

//   }

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
