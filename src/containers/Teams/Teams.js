import React from "react";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import axios from "axios";
import Table from "react-bootstrap/Table";

import "./Teams.css";
//import Collapsible from "react-collapsible";

const teamURL = "https://team-football-api.herokuapp.com/team/";
const playerURL = "https://team-football-api.herokuapp.com/playerbyteam/";

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      teams: [],
      players: []
    };
  }

  componentDidMount() {
    axios.get(teamURL).then(json => this.setState({ teams: json.data }));
    this.showTeam(1);
  }

  showTeam(teamId) {
    axios
      .get(playerURL + teamId)
      .then(json => this.setState({ players: json.data }));
  }

  render() {
    let counter1 = -1;
    let counter2 = -1;
    return (
      <div className="container">
        <NavigationBar />
        <h1 className="text-center">Teams</h1>
        <div className="row">
          <div className="col-6">
            {this.state.teams.map(data => {
              counter1++;
              return (
                <ul key={counter1} className="list-group text-center">
                  <li
                    onClick={this.showTeam.bind(this, data.team_id)}
                    className="list-group-item"
                  >
                    {data.team_name}
                  </li>
                </ul>
              );
            })}
          </div>
          <div className="col-7" />
          <div className="container">
            <Table responsive="sm">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Position</th>
                  <th>Number</th>
                  <th>Team</th>
                </tr>
              </thead>
              <tbody>
                {this.state.players.map(data => {
                  counter2++;
                  return (
                    <tr key={counter2}>
                      <td>{data[0] + " " + data[1]}</td>
                      <td>{data[2]}</td>
                      <td>{data[3]}</td>
                      <td>{data[4]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

export default Teams;
