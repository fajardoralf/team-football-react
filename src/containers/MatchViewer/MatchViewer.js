import React from 'react'
import axios from 'axios'
import { Form, Button, Card } from 'react-bootstrap'
import './MatchViewer.css'
import ShowMatch from '../../components/Matches/ShowMatch'

const URL = "https://team-football-api.herokuapp.com/"

class MatchViewer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            role: sessionStorage.getItem('role'),
            team: '',
            team_id: -1,
            teamInput: '',
            teamList: [],
            matches: []

        }
    }

    componentWillMount() {
        axios.get(URL + 'team').then(res => {
            console.log(res.data)
            this.setState({
                teamList: res.data
            })
        })

        // Get match data
        axios.get(URL + 'match').then(res => {
            this.setState({
                matches: res.data
            })
        })

    }

    onChangeHandlerTeam(e) {
        this.setState({
            teamInput: e.target.value,
        })
    }

    handleFormTeam(e) {
        this.setState({
            team: this.state.teamInput,
            team_id: this.getTeamId(this.state.teamInput)
        })
    }

    getTeamId(name) {
        for (let team of this.state.teamList) {
            if (team.team_name === name) return team.team_id
        }
        return -1
    }

    getTeamName(id) {
        for (let team of this.state.teamList) {
            if (team.team_id === id) return team.team_name
        }
        return "Unknown"
    }

    render() {

        const teams = this.state.teamList
            .filter(d => this.state.teamInput === '' || d.includes(this.state.teamInput))
            .map((d, index) => <li key={index}>{d}</li>);

        const matches = this.state.matches
            .filter(d => d.home_team_id === this.state.team_id || d.away_team_id === this.state.team_id)
            .map((d) => <ShowMatch
                homeTeam={this.getTeamName(d.home_team_id)}
                awayTeam={this.getTeamName(d.away_team_id)}
                result={d.result}
                role={sessionStorage.getItem('role')}
            />)

        return (
            <div>
                <h2> MatchViewer </h2>
                <form onSubmit={this.handleFormTeam.bind(this)}>
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={this.state.teamInput}
                        onChange={this.onChangeHandlerTeam.bind(this)}


                    />

                    <input
                        type="button"
                        value="Choose"
                        onClick={this.handleFormTeam.bind(this)}
                    />
                </form>
                <ul>{teams}</ul>
                <h4> {(this.state.team) ? <div>Show matches for  {this.state.team}</div> : <div>Select a team to show matches for above</div>}</h4>
                <ShowMatch
                    homeTeam='Liverpool'
                    awayTeam='Arsenal'
                    result={[3, 0]}
                    role={sessionStorage.getItem('role')}
                />
            </div>
        )
    }
}

export default MatchViewer;