import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/team/";
const coachURL = "https://team-football-api.herokuapp.com/coach";
const ownerURL = "https://team-football-api.herokuapp.com/owner";
const locationURL = "https://team-football-api.herokuapp.com/location";

class CreateTeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      coaches: [],
      locations: [],
      team_name: "",
      coach_id: "",
      owner_id: "",
      location_id: "",
      message: ""
    };
  }

  handleForm = event => {
    event.preventDefault();

    axios
      .post(URL, {
        team_name: this.state.team_name,
        coach_id: this.state.coach_id,
        owner_id: this.state.owner_id,
        location_id: this.state.location_id
      })
      .then(res => {
        console.log(res);
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
    this.setState({
      team_name: "",
      coach_id: "",
      owner_id: "",
      location_id: ""
    });
  };

  fetchCoach = () => {
    axios
      .get(coachURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            first_name: res.data.person && res.data.person.first_name,
            last_name: res.data.person && res.data.person.last_name
          });
          return {
            key: data.coach_id,
            value: data.coach_id,
            text: data.person.first_name,
            last_name: data.person.last_name
          };
        });
        this.setState({ coaches: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchOwner = () => {
    axios
      .get(ownerURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            first_name: res.data.person && res.data.person.first_name,
            last_name: res.data.person && res.data.person.last_name
          });
          return {
            key: data.owner_id,
            value: data.owner_id,
            text: data.person.first_name,
            last_name: data.person.last_name
          };
        });
        this.setState({ owners: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchLocation = () => {
    axios
      .get(locationURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        let data = res.data.map(data => {
          this.setState({
            name: res.data.name
          });
          return {
            key: data.location_id,
            value: data.location_id,
            text: data.name
          };
        });
        this.setState({ locations: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
        this.setState({
          message: "Something went wrong. Please check your inputs"
        });
      });
  };

  componentDidMount() {
    this.fetchCoach();
    this.fetchOwner();
    this.fetchLocation();
  }

  handleCoachId = event => {
    this.setState({
      coach_id: event.target.value
    });
  };

  handleOwnerId = event => {
    this.setState({
      owner_id: event.target.value
    });
  };

  handleLocationId = event => {
    this.setState({
      location_id: event.target.value
    });
  };
  setTeamName = event => {
    this.setState({
      team_name: event.target.value
    });
  };

  render() {
    let title = "Create Team";
    const { coaches, owners, locations } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="addPersonForm">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="teamName"
                placeholder="Team Name"
                value={this.state.team_name}
                onChange={this.setTeamName}
              />
            </Form.Group>

            <Form.Group controlId="createTeamForm">
              <Form.Label>Coach ID</Form.Label>
              <Form.Control onChange={this.handleCoachId} as="select">
                {coaches.map(data => {
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

            <Form.Group controlId="createTeamForm">
              <Form.Label>Owner ID</Form.Label>
              <Form.Control onChange={this.handleOwnerId} as="select">
                {owners.map(data => {
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

            <Form.Group controlId="createTeamForm">
              <Form.Label>Location ID</Form.Label>
              <Form.Control onChange={this.handleLocationId} as="select">
                {locations.map(data => {
                  return (
                    <option key={data.key} value={data.value}>
                      {data.text}
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

            <div className="text-center">{this.state.message}</div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default CreateTeamTable;
