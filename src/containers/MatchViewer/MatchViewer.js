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
            teamInput: '',
            teamList: [],
            matches: []

        }
    }

    /*
    componentWillMount() {
        axios.get(URL + 'team').then(res => {
            console.log(res.data)
            this.setState({
                teamList: res.data
            })
        })

        // Get match data
        axios.get(URL + 'match').then(res =>{
            this.setState({
                matches: res.data
            })
        })

    }
    */

    onChangeHandlerTeam(e) {
        this.setState({
            teamInput: e.target.value,
        })
    }

    handleFormTeam(e) {
        this.setState({
            team: this.state.teamInput
        })
    }

    render() {

        const teams = this.state.teamList
            .filter(d => this.state.teamInput === '' || d.includes(this.state.teamInput))
            .map((d, index) => <li key={index}>{d}</li>);

        const matches = this.state.matches
            .filter(d => d.homeTeam === this.state.team || d.awayTeam === this.state.team )
            .map((d) => <ShowMatch 
                            homeTeam= {d.homeTeam}
                            awayTeam= {d.awayTeam}
                            result= {d.result}
                            role={sessionStorage.getItem('role')}
            />)

        return (
            <div>
                <h2> MatchViewer </h2>
                    <input
                        type="text"
                        placeholder="Team Name"
                        value={this.state.teamInput}
                        onChange={this.onChangeHandlerTeam.bind(this)}
                        onSubmit={this.handleFormTeam.bind(this)}
                        
                    />
                    <input 
                        type="button"
                        value="Choose"
                        onClick={this.handleFormTeam.bind(this)}
                    />
                    <ul>{teams}</ul>
                <h4> {(this.state.team) ? <div>Show matches for  {this.state.team}</div> : <div>Select a team to show matches for above</div>}</h4>
                <ShowMatch 
                    homeTeam='Liverpool'
                    awayTeam='Arsenal'
                    result={[3,0]}
                    role={sessionStorage.getItem('role')}
                    />
            </div>
        )
    }
}

export default MatchViewer;