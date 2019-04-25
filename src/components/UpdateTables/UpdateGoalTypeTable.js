import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/goaltype/";

class UpdateGoalTypeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goal_type_id: "",
      type: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .put(
        URL + this.state.goal_type_id,
        {
          goal_type_id: this.state.goal_type_id,
          type: this.state.type,
          message: "Successfully Updated",
          submitted: true
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
        this.setState({
          message: "Successfully Updated"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      goal_type_id: "",
      type: ""
    });
  }

  setGoalTypeId(event) {
    this.setState({
      goal_type_id: event.target.value
    });
  }

  setType(event) {
    this.setState({
      type: event.target.value
    });
  }

  render() {
    let title = "Update Goal Type";

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="updateGoalTypeForm">
              <Form.Label>Goal Type IT</Form.Label>
              <Form.Control
                type="goal_type_id"
                placeholder="Goal Type ID"
                value={this.state.goal_type_id}
                onChange={this.setGoalTypeId.bind(this)}
              />
            </Form.Group>

            <Form.Group controlId="updateGoalTypeForm">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="type"
                placeholder="Type"
                value={this.state.type}
                onChange={this.setType.bind(this)}
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
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.type : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateGoalTypeTable;
