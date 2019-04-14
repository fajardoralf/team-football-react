import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchposition/";

class DeleteMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchPositions: [],
      matchPosition: "",
      id: "",
      message: "",
      submitted: false,
      mounted: true
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState(
        {
          message: "Successfully deleted ",
          submitted: true
        },
        this.fetchMatchPosition()
      );
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      matchPosition: event.target.selectedOptions[0].text
    });
  };

  fetchMatchPosition = () => {
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
              key: data.matchPosition_id,
              value: data.matchPosition_id,
              text: data.position
            };
          });
          this.setState({ matchPositions: data });
        })
        .catch(err => {
          console.log("Axios error: ", err);
        });
    }
  };

  componentDidMount() {
    this.fetchMatchPosition();
  }

  render() {
    let title = "Delete Match Position";
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Match Position</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.matchPositions.map(data => {
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
              {this.state.submitted ? this.state.matchPosition : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteMatchPositionTable;
