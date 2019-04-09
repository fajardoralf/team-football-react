import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateAssociationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        name: this.state.associationId,
        description: this.state.coachId
      })
    this.setState({
      name: "",
      description: ""
    });
  }

  setName(event) {
    this.setState({ 
      name: event.target.value
    });
  }

  setDescription(event) {
    this.setState({
      description: event.target.value
    });
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ store: json.data }));
  }

  render() {
    let title = "Create Association"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createAssociationForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.setName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="addAssociationForm">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Description"
                value={this.state.description}
                onChange={this.setDescription.bind(this)}
              />
            </Form.Group>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="Submit">
                Create
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateAssociationTable;