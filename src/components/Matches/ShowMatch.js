import React from 'react'
import { Card } from 'react-bootstrap'
import './ShowMatch.css'

class ShowMatch extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            homeTeam: props.homeTeam,
            awayTeam: props.awayTeam,
            result: props.result,
            role: props.role,
        }
    }

    render() {
        let winner = (this.state.result[0] > this.state.result[1]) ? "home" : (this.state.result[0] === this.state.result[1] ? "tie" : "away")

        return (
            <Card className="match">
                <div class="team">{this.state.homeTeam} - {this.state.awayTeam} </div>
                {(this.state.role) ?
                    <div class="result"> {this.state.result[0]} - {this.state.result[1]} </div>
                    :
                     (this.winner !== 'tie') ? <div>Winner: {winner} team! Log in to see score</div> 
                     :
                     <div>Tie! Log in to see the score</div> 
                }
            </Card>
        )
    }
}

export default ShowMatch