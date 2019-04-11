import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "";

class CreateSeasonTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: "",
      endDate: "",
      name: "",
      description: ""
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(URL, {
        start_date: this.state.startDate,
        end_date: this.state.endDate,
        name: this.state.name,
        description: this.state.description
      })
    this.setState({
      startDate: "",
      endDate: "",
      name: "",
      description: ""
    });
  }

  setStartDate(event) {
    this.setState({ 
      startDate: event.target.value
    });
  }

  setEndDate(event) {
    this.setState({
      endDate: event.target.value
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

  render() {
    let title = "Create Season"

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>

            <Form.Group controlId="createSeasonForm">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="startDate"
                placeholder="YYYY-MM-DD"
                value={this.state.startDate}
                onChange={this.setStartDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createSeasonForm">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="endDate"
                placeholder="YYYY-MM-DD"
                value={this.state.endDate}
                onChange={this.setEndDate.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createSeasonForm">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Name"
                value={this.state.name}
                onChange={this.setName.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="createSeasonForm">
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

export default CreateSeasonTable;