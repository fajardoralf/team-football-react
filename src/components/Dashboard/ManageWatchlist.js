import React from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios';
import './ManageWatchList.css'

const URL = "https://team-football-api.herokuapp.com/"

class ManageWatchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personId: 1,
            playerWatchList: [],
            teamWatchList: [],
            playerList: [],
            teamList: [],
            playerInput: '',
            teamInput: ''

        }
    }
    onChangeHandlerPlayer(e) {
        this.setState({
            playerInput: e.target.value,
        })
    }
    onChangeHandlerTeam(e) {
        this.setState({
            teamInput: e.target.value,
        })
    }

    onClickPlayer(name) {
        this.setState({
            playerInput: name
        })
    }
    onClickTeam(name) {
        this.setState({
            teamInput: name
        })
    }
    getPlayerId(name) {
        return 0
    }

    getTeamId(name) {
        return 0
    }

    handleFormPlayer(e) {
        // Submit to database
        e.preventDefault()
        axios.post(URL + 'watchlistplayer', {
            person_id: this.state.personId,
            player_id: this.getPlayerId(this.state.playerInput)
        }).then(res => {
            if (res.status === 202) {
                console.log("success")
            }
        })
    }
    handleFormTeam(e) {
        // Submit to database
        axios.post(URL + 'watchlistteam', {
            person_id: this.state.personId,
            team_id: this.getTeamId(this.state.teamInput)
        }).then(res => {
            if (res.status === 202) {
                console.log("success")
            }
        })
    }



    componentWillMount() {
        //fetch players, teams and watchlists for user

        // Player data currently does not return player name, only person_id. 
        // Waiting on response from backend to see if that can be included in response 
        // or if I need to fetch person table as well to find names.
        axios.get(URL + 'player', {
            headers: {
                Accept: "application/json"
            }
        }).then(res => {
            console.log(res.data)
            this.setState({
                playerList: res.data
            })
        })
        axios.get(URL + 'team').then(res => {
            console.log(res.data)
            this.setState({
                teamList: res.data
            })
        })
    }

    render() {
        const title = "Manage Watchlist"
        const players = this.state.playerList
            .filter(d => {

                return this.state.playerInput === '' || (d.person.first_name + ' ' + d.person.last_name).includes(this.state.playerInput)
            })
            .map((d, index) =>
                <li
                    onClick={this.onClickPlayer.bind(this, (d.person.first_name + ' ' + d.person.last_name ))}
                    key={index}>
                    {d.person.first_name  + ' ' + d.person.last_name}
                </li>);
        const teams = this.state.teamList
            .filter(d => this.state.teamInput === '' || d.team_name.includes(this.state.teamInput))
            .map((d, index) => <li onClick={this.onClickTeam.bind(this, d.team_name)} key={index}>{d.team_name}</li>);

        const players10 = (players.length > 10) ? players.slice(0, 10) : players
        const teams10 = (teams.length > 10) ? teams.slice(0, 10): teams
        return (
            <div>
                <h3 className='text-center'>{title}</h3><br />
                <div>
                    <Card bg="light" text="black" style={{ width: "18rem" }}>
                        <Card.Body>
                            <h4>Add Player</h4>
                            <div>
                                <Form onSubmit={this.handleFormPlayer.bind(this)}>
                                    <Form.Group controlId="watchlistAddPlayer">
                                        <Form.Control
                                            type="player"
                                            placeholder="Player Name"
                                            value={this.state.playerInput}
                                            onChange={this.onChangeHandlerPlayer.bind(this)}
                                        />
                                    </Form.Group>
                                    <ul>{players10}</ul>
                                    <Button variant="dark" type="Submit">
                                        Add
                                    </Button>
                                </Form>

                            </div>
                        </Card.Body>
                    </Card>
                </div>
                <div>
                    <Card bg="light" text="black" style={{ width: "18rem" }}>
                        <Card.Body>
                            <h4>Add Team</h4>
                            <div>
                                <Form onSubmit={this.handleFormTeam.bind(this)}>
                                    <Form.Group controlId="watchlistAddTeam">
                                        <Form.Control
                                            type="team"
                                            placeholder="Team Name"
                                            value={this.state.teamInput}
                                            onChange={this.onChangeHandlerTeam.bind(this)}
                                        />
                                    </Form.Group>
                                    <ul>{teams10}</ul>
                                    <Button variant="dark" type="Submit">
                                        Add
                                    </Button>
                                </Form>

                            </div>
                        </Card.Body>
                    </Card>

                </div>


            </div>
        )
    }
}

export default ManageWatchlist
