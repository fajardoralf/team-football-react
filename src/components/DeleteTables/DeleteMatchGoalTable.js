import React from "react";
import { Form, Button, Card, FormGroup } from "react-bootstrap";
import axios from "axios";

const URL = "https://team-football-api.herokuapp.com/matchgoal/";
const playerURL = "https://team-football-api.herokuapp.com/player/";
const matchURL = "https://team-football-api.herokuapp.com/match/";
const resultURL = "https://team-football-api.herokuapp.com/resultmatch/";

class DeleteMatchGoal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matchGoals: [],
      player: [],
      home_team: "",
      score_home: "",
      away_team: "",
      score_away: "",
      team: "",
      date: "",
      matchGoal: "",
      location: "",
      id: 10,
      match_id: 1,
      message: "",
      submitted: false
    };
  }

  handleForm = event => {
    event.preventDefault();
    axios.delete(URL + this.state.id).then(res => {
      this.setState(
        {
          message: "Successfully deleted ",
          contactName: this.state.goalType,
          submitted: true
        },
        () => {
          this.fetchMatchGoal();
          this.fetchPlayer();
          this.fetchMatch();
        }
      );
      console.log(res);
    });
  };

  handleChange = event => {
    this.setState(
      {
        id: event.target.value,
        matchGoal: event.target.selectedOptions[0].text,
        match_id: event.target.selectedOptions[0].getAttribute("match_id")
      },
      () => {
        this.fetchMatchGoal();
        this.fetchPlayer();
        this.fetchMatch();
        this.fetchResult();
      }
    );
  };

  fetchMatchGoal = () => {
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
            key: data.goal_id,
            value: data.player_id,
            match_id: data.match_id,
            text: data.description
          };
        });
        this.setState({ matchGoals: data, id: data.player_id });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchPlayer = () => {
    axios
      .get(playerURL + this.state.id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({ player: res });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  fetchMatch() {
    axios
      .get(matchURL + this.state.match_id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          match_id: res.data.match_id,
          home_team: res.data.home_team.team_name,
          away_team: res.data.away_team.team_name,
          location: res.data.location.name,
          date: res.data.match_date
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  }

  fetchResult = () => {
    axios
      .get(resultURL + this.state.match_id, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "Access-Control-Allow-Origin": "*"
        }
      })
      .then(res => {
        this.setState({
          score_home: res.data[0].score && res.data[0].score,
          score_away: res.data[1].score && res.data[1].score
        });
      })
      .catch(err => {
        console.log("Axios error: ", err);
      });
  };

  componentDidMount() {
    this.fetchMatchGoal();
    this.fetchPlayer();
    this.fetchMatch();
    this.fetchResult();
  }

  render() {
    let title = "Delete Match Goal";
    const { data } = this.state.player;

    const {
      home_team,
      away_team,
      location,
      score_home,
      score_away
    } = this.state;

    return (
      <Card bg="light" text="black" style={{ width: "18rem" }}>
        <Card.Body>
          <h3 className="text-center">{title}</h3>
          <br />
          <Form onSubmit={this.handleForm}>
            <FormGroup>
              <Form.Label>Match Goal</Form.Label>
              <Form.Control onChange={this.handleChange} as="select">
                {this.state.matchGoals.map(data => {
                  return (
                    <option
                      key={data.key}
                      value={data.value}
                      match_id={data.match_id}
                    >
                      {data.text}
                    </option>
                  );
                })}
              </Form.Control>
              <Form.Label>Date</Form.Label>
              <h6>{this.state.date}</h6>
              <Form.Label>Team</Form.Label>
              <h6>{data && data.team.team_name}</h6>
              <Form.Label>Player</Form.Label>
              <h6>
                {data &&
                  data.person.first_name +
                    " " +
                    data.person.last_name +
                    " " +
                    data.number}
              </h6>
              <Form.Label>Location</Form.Label>
              <h6>{location}</h6>
              <Form.Label>Match Between</Form.Label>
              <h6>
                {home_team +
                  " " +
                  score_home +
                  " vs " +
                  score_away +
                  " " +
                  away_team}
              </h6>
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
