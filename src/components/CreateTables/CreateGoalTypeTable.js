import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/goaltype/";

class CreateGoalTypeTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "",
      message: "",
      submitted: false
    };
  }

  handleForm(event) {
    event.preventDefault();

    axios
      .post(
        URL,
        {
          type: this.state.type,
          message: "Successfully created ",
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
          submitted: true,
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          submitted: false,
          message: "Something went wrong. Please check your inputs"
        });
      });
    this.setState({
      type: ""
    });
  }

  setType(event) {
    this.setState({
      type: event.target.value
    });
  }

  render() {
    let title = "Create Goal Type";

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm.bind(this)}>
            <Form.Group controlId="createGoalTypeForm">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="goal_type"
                placeholder="Type"
                style={{ textTransform: "capitalize" }}
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

export default CreateGoalTypeTable;
