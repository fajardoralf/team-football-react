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
        const {result,
            homeTeam,
            awayTeam,
            role
        } = this.state
        let winner = (result[0] > result[1]) ? homeTeam : (result[0] === result[1] ? "tie" : awayTeam)

        return (
            <Card className="match">
                <div className="team"><strong>{homeTeam} - {awayTeam} </strong></div>
                {(role) ?
                    <div className="result"> {result[0]} - {result[1]} </div>
                    :
                     (this.winner !== 'tie') ? <div>Winner: {winner}! Log in to see score</div> 
                     :
                     <div>Tie! Log in to see the score</div> 
                }
            </Card>
        )
    }
}

export default ShowMatch