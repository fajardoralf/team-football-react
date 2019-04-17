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
        for (let player of this.state.playerList) {
            if (player.person && ((player.person.first_name + ' ' + player.person.last_name)) === name) return player.player_id
        }
        return -1
    }

    getPlayer(id) {
        for (let player of this.state.playerList) {
            if (player.player_id === id) return player
        }
        return { person: {} }
    }

    getTeamId(name) {
        for (let team of this.state.teamList) {
            if (team.team_name === name) return team.team_id
        }
        return -1
    }

    getTeam(id){
        for (let team of this.state.teamList){
            if (team.team_id === id) return team
        }
        return "Unknown Team"
    }

    handleFormPlayer(e) {
        // Submit to database
        e.preventDefault()
        axios.post(URL + 'watchlistplayer', {
            user_id: this.state.personId,
            player_id: this.getPlayerId(this.state.playerInput)
        }).then(res => {
            if (res.status === 202) {
                console.log("success")
            }
        })
    }
    handleFormTeam(e) {
        // Submit to database
        e.preventDefault()
        axios.post(URL + 'watchlistteam', {
            user_id: this.state.personId,
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
        axios.get(URL + 'watchlistplayer').then(res => {
            this.setState({
                playerWatchList: res.data
            })
        })

        axios.get(URL + 'watchlistteam').then(res => {
            this.setState({
                teamWatchList: res.data
            })
        })
    }

    render() {

        const {personId,
            playerInput,
            teamInput,
            playerList,
            playerWatchList,
            teamWatchList,
            teamList
         } = this.state
         
        const title = "Manage Watchlist"
        const players = playerList
            .filter(d => {

                return playerInput === '' || (d.person.first_name + ' ' + d.person.last_name).includes(playerInput)
            })
            .map((d, index) =>
                <li
                    onClick={this.onClickPlayer.bind(this, (d.person.first_name + ' ' + d.person.last_name))}
                    key={index}>
                    {d.person.first_name + ' ' + d.person.last_name}
                </li>);
        const teams = teamList
            .filter(d => teamInput === '' || d.team_name.includes(teamInput))
            .map((d, index) => <li onClick={this.onClickTeam.bind(this, d.team_name)} key={index}>{d.team_name}</li>);


        const players10 = (players.length > 10) ? players.slice(0, 10) : players
        const teams10 = (teams.length > 10) ? teams.slice(0, 10) : teams

        const playerWatch = playerWatchList
            .filter(d => d.user_id === personId)
            .map(d => this.getPlayer(d.player_id))
            .map((d, index) =>
                <li key={index}>
                    {d.person.first_name + ' ' + d.person.last_name}
                    <Button variant="outline-danger">Remove</Button>
                </li>
            )
        
        const teamWatch = teamWatchList
            .filter(d => d.user_id = personId)
            .map(d => this.getTeam(d.team_id))
            .map((d, index) => 
                <li key={index}>
                    {d.team_name}
                    <Button variant="outline-danger">Remove</Button>
                </li>)
        return (
            <div>
                <h3 className='text-center'>{title}</h3><br />
                <div className="row">

                    <div className='col'>
                        <Card bg="light" text="black" style={{ width: "18rem" }}>
                            <Card.Body>
                                <h4>Add Player</h4>
                                <div>
                                    <Form onSubmit={this.handleFormPlayer.bind(this)}>
                                        <Form.Group controlId="watchlistAddPlayer">
                                            <Form.Control
                                                type="player"
                                                placeholder="Player Name"
                                                value={playerInput}
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
                        <Card bg="light" text="black" style={{ width: "18rem" }}>
                            <Card.Body>
                                <h4>Add Team</h4>
                                <div>
                                    <Form onSubmit={this.handleFormTeam.bind(this)}>
                                        <Form.Group controlId="watchlistAddTeam">
                                            <Form.Control
                                                type="team"
                                                placeholder="Team Name"
                                                value={teamInput}
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
                    <div className="col">
                        <Card>
                            <Card.Body>
                                <h4>Players</h4>
                                <ul>
                                    {playerWatch}
                                </ul>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body>
                                <h4>Teams</h4>
                                <ul>
                                    {teamWatch}
                                </ul>
                            </Card.Body>
                        </Card>
                    </div>


                </div>
            </div>
        )
    }
}

export default ManageWatchlist
