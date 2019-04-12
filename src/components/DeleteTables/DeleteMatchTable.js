import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/match/";

class DeleteMatchPositionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: [],
      matchInfo: [],
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
      this.setState({
        message: "Successfully deleted ",
        submitted: true
      });
    });
  };

  handleChange = event => {
    this.setState({
      id: event.target.value,
      matchPosition: event.target.selectedOptions[0].text
    });

    this.fetchMatchInfo();
  };

  fetchMatch = () => {
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
        this.setState({ matchPositions: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchMatch = () => {
    axios
      .get(URL + this.state.id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          return {
            match_date: data.match_date,
            value: data.goal_type_id,
            text: data.type
          };
        });
        this.setState({ matchInfo: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentWillMount() {
    this.fetchMatch();
  }

  componentWillUpdate() {
    this.fetchMatch();
  }

  render() {
    let title = "Delete Match";
    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Match</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.address.map(data => {
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
              {this.state.submitted ? this.state.match : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default DeleteMatchPositionTable;
