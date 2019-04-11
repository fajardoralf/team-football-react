import React from 'react';
import './Dashboard.css';
import CreatePersonTable from '../../components/CreateTables/CreatePersonTable'
import CreateAddressTable from '../../components/CreateTables/CreateAddressTable'
import CreateAssociationTable from '../../components/CreateTables/CreateAssociationTable'
import CreateContactTable from '../../components/CreateTables/CreateContactTable'
import CreateGoalTypeTable from '../../components/CreateTables/CreateGoalTypeTable'
import CreateLocationTable from '../../components/CreateTables/CreateLocationTable'
import CreateMatchGoalTable from '../../components/CreateTables/CreateMatchGoalTable'
import CreateMatchPositionTable from '../../components/CreateTables/CreateMatchPositionTable'
import CreateMatchTable from '../../components/CreateTables/CreateMatchTable'
import CreateResultTable from '../../components/CreateTables/CreateResultTable'
import CreateSeasonTable from '../../components/CreateTables/CreateSeasonTable'
import CreateTeamTable from '../../components/CreateTables/CreateTeamTable'
import UpdatePersonTable from '../../components/UpdateTables/UpdatePersonTable'
import UpdateAddressTable from '../../components/UpdateTables/UpdateAddressTable'
import UpdateSelfTable from '../../components/UpdateTables/UpdateSelfTable'
import ManageWatchlist from '../../components/Dashboard/ManageWatchlist'
import SubmitCorrection from '../../components/Dashboard/SubmitCorrection'
import UpdateAssociationTable from '../../components/UpdateTables/UpdateAssociationTable'
import UpdateContactTable from '../../components/UpdateTables/UpdateContactTable'
import UpdateLocationTable from '../../components/UpdateTables/UpdateLocationTable'
import UpdateMatchGoalTable from '../../components/UpdateTables/UpdateMatchGoalTable'
import UpdateMatchPositionTable from '../../components/UpdateTables/UpdateMatchPositionTable'
import UpdateMatchTable from '../../components/UpdateTables/UpdateMatchTable'
import UpdateResultTable from '../../components/UpdateTables/UpdateResultTable'
import UpdateSeasonTable from '../../components/UpdateTables/UpdateSeasonTable'

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0
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
                <div className="text-right">
                    <a href='/' className='btn btn-info' id="button">Back</a>
                </div>
                <div className="row">
                    {sessionStorage.getItem("role") ?
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
                                <div onClick={this.setStatus.bind(this, 13)}><li className="list-group-item" id="button">Update Person</li></div>
                                <div onClick={this.setStatus.bind(this, 14)}><li className="list-group-item" id="button">Update Address</li></div>
                                <div onClick={this.setStatus.bind(this, 18)}><li className="list-group-item" id="button">Update Association</li></div>
                                <div onClick={this.setStatus.bind(this, 19)}><li className="list-group-item" id="button">Update Contact</li></div>
                                <div onClick={this.setStatus.bind(this, 20)}><li className="list-group-item" id="button">Update Location</li></div>
                                <div onClick={this.setStatus.bind(this, 21)}><li className="list-group-item" id="button">Update Match Goal</li></div>
                                <div onClick={this.setStatus.bind(this, 22)}><li className="list-group-item" id="button">Update Match Position</li></div>
                                <div onClick={this.setStatus.bind(this, 23)}><li className="list-group-item" id="button">Update Match</li></div>
                                <div onClick={this.setStatus.bind(this, 24)}><li className="list-group-item" id="button">Update Result</li></div>
                                <div onClick={this.setStatus.bind(this, 25)}><li className="list-group-item" id="button">Update Season</li></div>

                            </ul>
                        </div>
                        :
                        <ul className="list-group text-center">
                            <div onClick={this.setStatus.bind(this, 15)}><li className="list-group-item" id="button">Update Info</li></div>
                            <div onClick={this.setStatus.bind(this, 16)}><li className="list-group-item" id="button">Manage Watchlist</li></div>
                            <div onClick={this.setStatus.bind(this, 17)}><li className="list-group-item" id="button">BONUS: Submit Correction</li></div>
                        </ul>
                    }
                    <div className="col-8">

                        {{
                            0: <div></div>,
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
                            12: <CreateTeamTable></CreateTeamTable>,
                            13: <UpdatePersonTable></UpdatePersonTable>,
                            14: <UpdateAddressTable></UpdateAddressTable>,
                            15: <UpdateSelfTable personID="0"></UpdateSelfTable>,
                            16: <ManageWatchlist></ManageWatchlist>,
                            17: <SubmitCorrection></SubmitCorrection>,
                            18: <UpdateAssociationTable></UpdateAssociationTable>,
                            19: <UpdateContactTable></UpdateContactTable>,
                            20: <UpdateLocationTable></UpdateLocationTable>,
                            21: <UpdateMatchGoalTable></UpdateMatchGoalTable>,
                            22: <UpdateMatchPositionTable></UpdateMatchPositionTable>,
                            23: <UpdateMatchTable></UpdateMatchTable>,
                            24: <UpdateResultTable></UpdateResultTable>,
                            25: <UpdateSeasonTable></UpdateSeasonTable>
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