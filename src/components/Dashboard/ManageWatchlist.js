import React from 'react';
import { Form, Button, Card } from 'react-bootstrap'
import axios from 'axios';
import './ManageWatchList.css'

class ManageWatchlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            personId: '',
            playerWatchList: [],
            teamWatchList: [],
            playerList: ["Ronaldo", "Ronaldinho", "Pele", "Messi", "Salah"],
            teamList: ["Real Madrid", "Barcelona", "Liverpool", "Manchester United", "Manchester City"],
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

    handleFormPlayer(e) {
        // Submit to database
    }
    handleFormTeam(e) {
        // Submit to database
    }

    componentDidMount() {
        //fetch players, teams and watchlists for user
    }

    render() {
        const title = "Manage Watchlist"
        const players = this.state.playerList
            .filter(d => this.state.playerInput === '' || d.includes(this.state.playerInput))
            .map((d, index) => <li key={index}>{d}</li>);
        const teams = this.state.teamList
            .filter(d => this.state.teamInput === '' || d.includes(this.state.teamInput))
            .map((d, index) => <li key={index}>{d}</li>);

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
                                    <ul>{players}</ul>
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
                                    <ul>{teams}</ul>
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
