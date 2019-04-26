import React from "react";
import "./MatchViewer.css";
import ShowMatch from "../../components/Matches/ShowMatch";
import BrowsePlayer from "../../components/AnonymousBrowse/BrowsePlayer";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const URL = "https://team-football-api.herokuapp.com/";

class MatchViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      role: sessionStorage.getItem("role"),
      team: "",
      team_id: -1,
      teamInput: "",
      teamList: [],
      matches: [],
      results: []
    };
  }

  componentWillMount() {
    axios.get(URL + "team").then(res => {
      this.setState({
        teamList: res.data
      });
    });

    // Get match data
    axios.get(URL + "match").then(res => {
      this.setState({
        matches: res.data
      });
    });

    axios.get(URL + "result").then(res => {
      this.setState({
        results: res.data
      });
    });
  }

  onChangeHandlerTeam(e) {
    this.setState({
      teamInput: e.target.value
    });
  }

  handleFormTeam(e) {
    e.preventDefault();
    this.setState({
      team: this.state.teamInput,
      team_id: this.getTeamId(this.state.teamInput)
    });
  }

  getTeamId(name) {
    for (let team of this.state.teamList) {
      if (team.team_name === name) return team.team_id;
    }
    return -1;
  }


  getResult(match) {
    let res = [0, 0];
    for (let result of this.state.results) {
      if (
        result.match_id === match.match_id &&
        result.team_id === match.home_team_id
      ) {
        res[0] = result.score;
      }
      if (
        result.match_id === match.match_id &&
        result.team_id === match.away_team_id
      ) {
        res[1] = result.score;
      }
    }
    return res;
  }

  setTeam(name) {
    this.setState({
      team: name,
      team_id: this.getTeamId(name)
    });
  }

  render() {
    const {
      teamList,
      teamInput,
      matches,
      team_id,
      team
    } = this.state

    const teams = teamList
      .filter(
        d =>
          teamInput.toLocaleLowerCase() === "" ||
          d.team_name.toLocaleLowerCase().includes(teamInput.toLocaleLowerCase())
      )
      .map((d, index) => (
        <li onClick={this.setTeam.bind(this, d.team_name)} key={index}>
          {d.team_name}
        </li>
      ));

    const showMatches = matches
      .filter(
        d =>
          d.home_team_id === team_id ||
          d.away_team_id === team_id
      )
      .map(d => (
        <ShowMatch
          key={d.match_id}
          homeTeam={d.home_team.team_name}
          awayTeam={d.away_team.team_name}
          result={this.getResult(d)}
          role={sessionStorage.getItem("role")}
        />
      ));
    return (
      <div className="container" id="frontPage">
        <div className="row">
          <div className="col-lg-6">
            <Form onSubmit={this.handleFormTeam.bind(this)}>
              <h2> Match Viewer </h2>
              <Form.Control
                id="matchViewerField"
                type="text"
                placeholder="Team Name"
                value={teamInput}
                onChange={this.onChangeHandlerTeam.bind(this)}
              />

              <Button
                id="matchViewerButton"
                className="bg-dark"
                type="button"
                value="Choose"
                onClick={this.handleFormTeam.bind(this)}
              >
                Choose
              </Button>

              <ul>{teams}</ul>
            </Form>
            <h4>
              {team ? (
                <div>Show matches for {team}</div>
              ) : (
                <div>Select a team to show matches for above</div>
              )}
            </h4>
            <div className="row">{showMatches}</div>
          </div>
          <div className="col-lg-6">
            <h1>Players</h1>
            <BrowsePlayer />
          </div>
        </div>
      </div>
    );
  }
}

export default MatchViewer;
