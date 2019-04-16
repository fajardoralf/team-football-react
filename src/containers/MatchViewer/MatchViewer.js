import React from 'react'
import './MatchViewer.css'
import ShowMatch from '../../components/Matches/ShowMatch'
import BrowsePlayer from '../../components/AnonymousBrowse/BrowsePlayer';
import axios from 'axios'

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
            matches: [],
            results: []

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

        axios.get(URL + 'result').then(res => {
            this.setState({
                results: res.data
            })
        })

    }


    onChangeHandlerTeam(e) {
        this.setState({
            teamInput: e.target.value,
        })
    }

    handleFormTeam(e) {
        e.preventDefault()
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

    getResult(match) {
        let res = [0, 0]
        for (let result of this.state.results) {
            if (result.match_id === match.match_id && result.team_id === match.home_team_id) {
                res[0] = result.score
            }
            if (result.match_id === match.match_id && result.team_id === match.away_team_id) {
                res[1] = result.score
            }
        }
        return res
    }

    setTeam(name) {
        this.setState({
            team: name,
            team_id: this.getTeamId(name)
        })
    }

    render() {

        const teams = this.state.teamList
            .filter(d => this.state.teamInput === '' || d.team_name.includes(this.state.teamInput))
            .map((d, index) => <li onClick={this.setTeam.bind(this, d.team_name)} key={index}>{d.team_name}</li>);


        const matches = this.state.matches
            .filter(d => d.home_team_id === this.state.team_id || d.away_team_id === this.state.team_id)
            .map((d) => <ShowMatch
                key={d.match_id}
                homeTeam={this.getTeamName(d.home_team_id)}
                awayTeam={this.getTeamName(d.away_team_id)}
                result={this.getResult(d)}
                role={sessionStorage.getItem('role')}
            />)


        return (
            <div className="container" id="frontPage">
                <div className="row">
                    <div className="col-6">
                        <BrowsePlayer></BrowsePlayer>
                    </div>
                    <div className="col-6">
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

                            <ul>{teams}</ul>


                        </form>
                        <h4>
                            {(this.state.team) ?
                                <div>Show matches for  {this.state.team}</div>
                                :
                                <div>Select a team to show matches for above</div>
                            }
                        </h4>
                        <div className="row">{matches}</div>
                    </div>
                </div>

            </div>
        )
    }
}

export default MatchViewer;