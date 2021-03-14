import React, { Component } from "react";
import { Form, Card, Button } from "react-bootstrap";
import { api } from "../../utils/Api";
import './CreateCategories.css';

class CreateCategories extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.submitCategory = this.submitCategory.bind(this);
    this.categoryChange = this.categoryChange.bind(this);
  }

  initialState = {
    title: "",
    description: "",
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  submitCategory = (event) => {
    event.preventDefault();

    const category = {
      title: this.state.title,
      description: this.state.description,
    };

    api
      .saveCategory(category)
      .then((response) => {
        if (response.data != null) {
          this.setState(this.initialState);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    this.props.history.push("/");
  };

  resetCategory = () => {
    this.setState(() => this.initialState);
  };

  categoryChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  render() {
    const { title, description } = this.state;

    return (
      <div className="container pt-5 animated fadeInUp">
        <Card className="cardBorder shadow-lg">
          <Card.Header>Add a Category</Card.Header>
          <Form onSubmit={this.submitCategory} onReset={this.resetCategory}>
            <Card.Body>
              <Form.Group controlId="formBasicTitle">
                <Form.Label>Tittle</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  type="title"
                  name="title"
                  value={title}
                  onChange={this.categoryChange}
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
                  onChange={this.categoryChange}
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
      </div>
    );
  }
}

export default CreateCategories;
