import React from "react";
import { Form, Button, Card } from "react-bootstrap";
import axios from "axios";

const teamURL = "https://team-football-api.herokuapp.com/team/";
const coachURL = "https://team-football-api.herokuapp.com/coach";
const ownerURL = "https://team-football-api.herokuapp.com/owner";
const locationURL = "https://team-football-api.herokuapp.com/location";

class UpdateTeamTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      owners: [],
      coaches: [],
      locations: [],
      teams: [],
      team_id: "",
      association_id: "",
      coach_id: "",
      current_coach: "",
      owner_id: "",
      current_owner: "",
      location_id: "",
      current_location: "",
      team_name: "",
      new_team_name: "",
      message: "",
      submitted: false
    };
  }

  fetchTeam = () => {
    axios
      .get(teamURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        this.setState({
          team_id: res.data[0].team_id,
          team_name: res.data[0].team_name,
          current_owner:
            res.data[0].owner.person.first_name +
            " " +
            res.data[0].owner.person.last_name,
          current_coach:
            res.data[0].coach.person.first_name +
            " " +
            res.data[0].coach.person.first_name,
          current_location: res.data[0].location.name
        });
        let data = res.data.map(data => {
          return {
            key: data.team_id,
            text: data.team_name,
            current_owner:
              data.owner.person.first_name + " " + data.owner.person.last_name,
            current_coach:
              data.coach.person.first_name + " " + data.coach.person.last_name,
            current_location: data.location.name
          };
        });
        this.setState({ teams: data });
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
          
        }
      })
      .then(res => {
        this.setState({
          owner_id: res.data[0].owner_id
        });
        let data = res.data.map(data => {
          this.setState({
            first_name: res.data.person && res.data.person.first_name,
            last_name: res.data.person && res.data.person.last_name
          });
          return {
            key: data.owner_id,
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

  fetchCoach = () => {
    axios
      .get(coachURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        this.setState({
          coach_id: res.data[0].coach_id
        });
        let data = res.data.map(data => {
          this.setState({
            first_name: res.data.person && res.data.person.first_name,
            last_name: res.data.person && res.data.person.last_name
          });
          return {
            key: data.coach_id,
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

  fetchLocation = () => {
    axios
      .get(locationURL, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          
        }
      })
      .then(res => {
        this.setState({
          location_id: res.data[0].location_id
        });
        let data = res.data.map(data => {
          this.setState({
            name: res.data.name
          });
          return {
            key: data.location_id,
            text: data.name
          };
        });
        this.setState({ locations: data });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  handleForm = event => {
    event.preventDefault();
    axios
      .put(
        teamURL + this.state.team_id,
        {
          team_id: this.state.team_id,
          coach_id: this.state.coach_id,
          owner_id: this.state.owner_id,
          location_id: this.state.location_id,
          team_name:
            this.state.new_team_name !== ""
              ? this.state.new_team_name
              : this.state.team_name
        },
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            
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
  };

  setTeam_id = event => {
    this.setState({
      team_id: event.target.value,
      team_name: event.target.selectedOptions[0].getAttribute("team_name"),
      current_coach: event.target.selectedOptions[0].getAttribute(
        "current_coach"
      ),
      current_location: event.target.selectedOptions[0].getAttribute(
        "current_location"
      ),
      current_owner: event.target.selectedOptions[0].getAttribute(
        "current_owner"
      )
    });
  };

  setCoach_id = event => {
    console.log(event.target.value);
    this.setState({
      coach_id: event.target.value
    });
  };
  setOwner_id = event => {
    console.log(event.target.value);
    this.setState({
      owner_id: event.target.value
    });
  };
  setLocation_id = event => {
    console.log(event.target.value);
    this.setState({
      location_id: event.target.value
    });
  };

  setTeamName = event => {
    this.setState({
      new_team_name: event.target.value
    });
  };

  componentDidMount() {
    this.fetchCoach();
    this.fetchOwner();
    this.fetchLocation();
    this.fetchTeam();
  }

  render() {
    let title = "Update Team";
    const {
      coaches,
      owners,
      locations,
      teams,
      team_name,
      current_coach,
      current_location,
      current_owner
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "100%" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <Form.Group controlId="updateTeamForm">
              <Form.Label>Team ID</Form.Label>
              <Form.Control onChange={this.setTeam_id} as="select">
                {teams.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      team_name={data.text}
                      current_coach={data.current_coach}
                      current_owner={data.current_owner}
                      current_location={data.current_location}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="updateTeamForm">
              <Form.Label>Coach</Form.Label>
              <Form.Control onChange={this.setCoach_id} as="select">
                {coaches.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      last_name={data.last_name}
                    >
                      {data.text + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current Coach: {current_coach}</h6>
            </Form.Group>

            <Form.Group controlId="udpateTeamForm">
              <Form.Label>Owner</Form.Label>
              <Form.Control onChange={this.setOwner_id} as="select">
                {owners.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.key}
                      last_name={data.last_name}
                    >
                      {data.text + " " + data.last_name}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current Owner: {current_owner}</h6>
            </Form.Group>

            <Form.Group controlId="updateTeamForm">
              <Form.Label>Location</Form.Label>
              <Form.Control onChange={this.setLocation_id} as="select">
                {locations.map(data => {
                  return (
                    <option key={data.key} value={data.key}>
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
              <h6>Current Location: {current_location}</h6>
            </Form.Group>

            <Form.Group controlId="updateTeamForm">
              <Form.Label>Team Name</Form.Label>
              <Form.Control
                type="teamname"
                placeholder={team_name}
                value={this.state.new_team_name}
                onChange={this.setTeamName}
              />
              <h6>Current Teamname: {team_name}</h6>
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
            <br />

            <div className="text-center">
              {this.state.message}
              {this.state.submitted ? this.state.team_id : ""}
            </div>
          </Form>
        </Card.Body>
      </Card>
    );
  }
}

export default UpdateTeamTable;
