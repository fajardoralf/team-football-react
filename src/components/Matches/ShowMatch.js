import React from 'react'
import {Card} from 'react-bootstrap'

class ShowMatch extends React.Component{

    constructor(props) {
        super(props)

        this.state = {
            homeTeam : props.homeTeam,
            awayTeam : props.awayTeam,
            result : props.result,
            role: props.role,
        }
    }

    render() {

        return (
            <Card>
                <div>{this.state.homeTeam} - {this.state.awayTeam} </div>
                {(this.state.role) ? <div> {this.state.result[0]} - {this.state.result[1]} </div> : <div>Log in to see result</div>}
            </Card>
        )
    }
}

export default ShowMatch