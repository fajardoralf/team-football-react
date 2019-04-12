import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";

class DeleteMatchGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      goalTypes: [],
      goalType: "",
      id: "",
      message: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState({
        message: "Successfully deleted ",
        contactName: this.state.goalType,
        submitted: true
      });
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      goalType: event.target.selectedOptions[0].text
    });
  };

  fetchMatchGoal = () => {
    if (this.state.mounted) {
      axios
        .get(URL, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Access-Control-Allow-Origin": "*"
          }
        })
        .then(res => {
          let data = res.data.map(data => {
            return {
              key: data.goal_type_id,
              value: data.goal_type_id,
              text: data.type
            };
          });
          this.setState({ goalTypes: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentWillMount() {
    this.fetchMatchGoal();
  }

  componentWillUpdate() {
    this.fetchMatchGoal();
  }

  render() {
    let title = "Delete Goaltypes";
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Goal Type</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.goalTypes.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </FormGroup>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button variant="dark" type="Submit">
                Delete
              </Button>
            </div>
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.goalType : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteMatchGoal;
