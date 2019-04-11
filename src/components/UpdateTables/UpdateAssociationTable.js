import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class UpdateAssociationTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      associationId: "",
      name: "",
      description: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(URL, {
        association_id: this.state.associationId,
        name: this.state.name,
        description: this.state.description
      },
      {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    .then(res => {
      console.log("response: ", res);
    })
    .catch(err => {
      console.log("Axios error: ", err);
    });
    this.setState({
        associationId: "",
        name: "",
        description: ""
    });
  }

  handleAssociationId(event) {
      this.setState({
          associationId: event.target.value
      })
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

  render() {
    const title = "Update Association";

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateAssociationForm">
              <Form.Label>Where Association ID is:</Form.Label>
              <Form.Control
                type="associationId"
                placeholder="Association ID"
                value={this.state.associationId}
                onChange={this.handleAssociationId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateAssociationForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.setName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="udpateAssociationForm">
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
                Update
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateAssociationTable;