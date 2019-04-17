import React from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import { Button } from 'react-bootstrap'

const URL = "https://team-football-api.herokuapp.com/playernameandteam/";

class BrowsePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      showMore: false
    };
  }

  componentDidMount() {
    axios.get(URL).then(json => this.setState({ players: json.data }));
  }

  toggleShowMore() {
    this.setState({showMore: !this.state.showMore})
  }


  render() {

    const { showMore } = this.state
    const players = this.state.players.map((data, index) =>
      <tr key={index}>
        <td>{data[0] + " " + data[1]}</td>
        <td>{data[4]} </td>
      </tr>
    )

    const players10 = (players.length > 10) ? players.slice(0, 10) : players
    return (
      <div>
        <Table responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {(this.state.showMore) ?
            players
            :
            players10}
          </tbody>
        </Table>
        <Button
          onClick={this.toggleShowMore.bind(this)}
          >
          {showMore ? "Show less" : "Show More"}
        </Button>
      </div>
    );
  }
}

export default BrowsePlayer;
