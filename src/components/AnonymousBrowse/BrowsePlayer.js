import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const URL = "https://team-football-api.herokuapp.com/playernameandteam/";

class BrowsePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: []
    };
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ players: json.data }));
  }

  render() {
    let counter = 0;
    return (
      <Table responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Team</th>
          </tr>
        </thead>
        <tbody>
          {this.state.players.map(data => {
            counter++;
            return (
              <tr key={counter}>
                <td>{data[0] + " " + data[1]}</td>
                <td>{data[4]} </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

export default BrowsePlayer;
