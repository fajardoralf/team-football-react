import React from 'react';
import './Dashboard.css';
import CreatePersonTable from '../../components/Tables/CreatePersonTable'
import CreateAddressTable from '../../components/Tables/CreateAddressTable'
import CreateAssociationTable from '../../components/Tables/CreateAssociationTable'
import CreateContactTable from '../../components/Tables/CreateContactTable'
import CreateGoalTypeTable from '../../components/Tables/CreateGoalTypeTable'
import CreateLocationTable from '../../components/Tables/CreateLocationTable'
import CreateMatchGoalTable from '../../components/Tables/CreateMatchGoalTable'
import CreateMatchPositionTable from '../../components/Tables/CreateMatchPositionTable'
import CreateMatchTable from '../../components/Tables/CreateMatchTable'
import CreateResultTable from '../../components/Tables/CreateResultTable'
import CreateSeasonTable from '../../components/Tables/CreateSeasonTable'
import CreateTeamTable from '../../components/Tables/CreateTeamTable'
/* A JSX comment 
import CreateLocation from '../../components/Dashboard/createLocation';
import CreatePerson from '../../components/Dashboard/createPerson';
import CreateTeam from '../../components/Dashboard/createTeam';
import EditPerson from '../../components/Dashboard/editPerson';
*/



class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 1
        };
    }

    setStatus(number) {
        this.setState({
            status: number
        })
    }

    render() {
        return (
            <div className="container">
                <h1 className="text-center">Dashboard</h1>
                <div className="row">
                    <div className="col-4">
                        <ul className="list-group text-center">
                            <div onClick={this.setStatus.bind(this, 1)}><li className="list-group-item" id="button">Create Person</li></div>
                            <div onClick={this.setStatus.bind(this, 2)}><li className="list-group-item" id="button">Create Address</li></div>
                            <div onClick={this.setStatus.bind(this, 3)}><li className="list-group-item" id="button">Create Association</li></div>
                            <div onClick={this.setStatus.bind(this, 4)}><li className="list-group-item" id="button">Create Contact</li></div>
                            <div onClick={this.setStatus.bind(this, 5)}><li className="list-group-item" id="button">Create GoalType</li></div>
                            <div onClick={this.setStatus.bind(this, 6)}><li className="list-group-item" id="button">Create Location</li></div>
                            <div onClick={this.setStatus.bind(this, 7)}><li className="list-group-item" id="button">Create Match Goal</li></div>
                            <div onClick={this.setStatus.bind(this, 8)}><li className="list-group-item" id="button">Create Match Position</li></div>
                            <div onClick={this.setStatus.bind(this, 9)}><li className="list-group-item" id="button">Create Match</li></div>
                            <div onClick={this.setStatus.bind(this, 10)}><li className="list-group-item" id="button">Create Result</li></div>
                            <div onClick={this.setStatus.bind(this, 11)}><li className="list-group-item" id="button">Create Season</li></div>
                            <div onClick={this.setStatus.bind(this, 12)}><li className="list-group-item" id="button">Create Team</li></div>
                        </ul>
                    </div>
                    <div className="col-8">
                    
                         {{
                            1: <CreatePersonTable></CreatePersonTable>,
                            2: <CreateAddressTable></CreateAddressTable>,
                            3: <CreateAssociationTable></CreateAssociationTable>,
                            4: <CreateContactTable></CreateContactTable>,
                            5: <CreateGoalTypeTable></CreateGoalTypeTable>,
                            6: <CreateLocationTable></CreateLocationTable>,
                            7: <CreateMatchGoalTable></CreateMatchGoalTable>,
                            8: <CreateMatchPositionTable></CreateMatchPositionTable>,
                            9: <CreateMatchTable></CreateMatchTable>,
                            10: <CreateResultTable></CreateResultTable>,
                            11: <CreateSeasonTable></CreateSeasonTable>,
                            12: <CreateTeamTable></CreateTeamTable>
                        }[this.state.status]}
                     </div>
                </div>
            </div>
            
            /* A JSX comment 

            <div className="DashboardOwner text-center">
            <div className="text-right">
                <a href='/' className='btn btn-info' id="button">Back</a>
            </div>
            <h1>Dashboard</h1>
                <div className="row">
                    <div className="col" id="button">
                        <h3 className="mt-5">Edit User</h3>
                        <EditPerson/>
                    </div>
                    <div className="col" id="button">
                        <h3 className="mt-5">Create Person</h3>
                        <CreatePerson/>
                    </div>
                    <div className="col" id="button">
                        <h3 className="mt-5">Create Team</h3>
                        <CreateTeam/>
                    </div>
                    <div className="col" id="button">
                        <h3 className="mt-5">Create Location</h3>
                        <CreateLocation/>
                    </div>
                </div>
            </div>
            */
        )
    }
}

export default Dashboard