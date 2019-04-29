import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/player";
const personURL = "https://team-football-api.herokuapp.com/person";
const teamURL = "https://team-football-api.herokuapp.com/team";

class CreatePlayerTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      teams: [],
      person_id: "",
      team_id: "",
      position: "",
      normal_position: [
        { key: 1, value: "Goalkeeper" },
        { key: 2, value: "Defender" },
        { key: 3, value: "Midfielder" },
        { key: 4, value: "Forward" }
      ],
      number: 1,
      numbers: [],
      message: "",
      submitted: false
    };
  }

  createNumber = () => {
    for (let i = 1; i < 100; i++) {
      this.state.numbers.push({ key: i, value: i });
    }
  };

  handleForm = event => {
    event.preventDefault();

    axios
      .post(
        URL,
        {
          person_id: this.state.person_id,
          team_id: this.state.team_id,
          normal_position: this.state.position,
          number: this.state.number,
          message: "Successfully created ",
          submitted: true
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        }
      )
      .then(res => {
        console.log("response: ", res);
        this.setState({
          message: "Successfully Created"
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
  };

  fetchPerson = () => {
    axios
      .get(personURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            person_id: res.data.person_id,
            first_name: res.data.first_name,
            last_name: res.data.last_name
          });
          return {
            key: data.person_id,
            value: data.person_id,
            text: data.first_name,
            last_name: data.last_name
          };
        });
        this.setState({ persons: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchTeam = () => {
    axios
      .get(teamURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            team_name: res.data.team_name
          });
          return {
            key: data.team_id,
            value: data.team_id,
            text: data.team_name
          };
        });
        this.setState({ teams: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  setPerson_id = event => {
    this.setState({
      person_id: event.target.value
    });
  };

  setTeam_id = event => {
    this.setState({
      team_id: event.target.value
    });
  };
  setNormal_position = event => {
    this.setState({
      position: event.target.value
    });
  };
  setNumber = event => {
    console.log(event.target.value);
    this.setState({
      number: event.target.value
    });
  };

  componentDidMount() {
    this.fetchPerson();
    this.fetchTeam();
    this.createNumber();
  }

  render() {
    let title = "Create Player";
    const { persons, teams, normal_position, numbers } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="addPlayerForm">
              <Form.Label>Person</Form.Label>
              <Form.Control onChange={this.setPerson_id} as="select">
                {persons.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      last_name={data.last_name}
                    >
                      {data.text + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="addPlayerForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control onChange={this.setTeam_id} as="select">
                {teams.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      team_name={data.team_name}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="addPlayerForm">
              <Form.Label>Normal Position</Form.Label>
              <Form.Control as="select" onChange={this.setNormal_position}>
                {normal_position.map(data => {
                  return <option key={data.key}>{data.value}</option>;
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="addPlayerForm">
              <Form.Label>Number</Form.Label>
              <Form.Control as="select" onChange={this.setNumber}>
                {numbers.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.value}
                    </option>
                  );
                })}
              </Form.Control>
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
              {this.state.submitted ? this.state.number : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreatePlayerTable;
