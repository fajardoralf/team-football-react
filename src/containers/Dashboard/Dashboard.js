import React from 'react';
import './Dashboard.css';
import CreatePersonTable from '../../components/CreateTables/CreatePersonTable'
import CreateAddressTable from '../../components/CreateTables/CreateAddressTable'
import CreateContactTable from '../../components/CreateTables/CreateContactTable'
import CreateGoalTypeTable from '../../components/CreateTables/CreateGoalTypeTable'
import CreateLocationTable from '../../components/CreateTables/CreateLocationTable'
import CreateMatchGoalTable from '../../components/CreateTables/CreateMatchGoalTable'
import CreateMatchPositionTable from '../../components/CreateTables/CreateMatchPositionTable'
import CreateMatchTable from '../../components/CreateTables/CreateMatchTable'
import CreateResultTable from '../../components/CreateTables/CreateResultTable'
import CreateSeasonTable from '../../components/CreateTables/CreateSeasonTable'
import CreateTeamTable from '../../components/CreateTables/CreateTeamTable'
import CreatePlayerTable from '../../components/CreateTables/CreatePlayerTable'
import UpdatePersonTable from '../../components/UpdateTables/UpdatePersonTable'
import UpdateAddressTable from '../../components/UpdateTables/UpdateAddressTable'
import UpdateSelfTable from '../../components/UpdateTables/UpdateSelfTable'
import ManageWatchlist from '../../components/Dashboard/ManageWatchlist'
import SubmitCorrection from '../../components/Dashboard/SubmitCorrection'
import UpdateContactTable from '../../components/UpdateTables/UpdateContactTable'
import UpdateLocationTable from '../../components/UpdateTables/UpdateLocationTable'
import UpdateMatchGoalTable from '../../components/UpdateTables/UpdateMatchGoalTable'
import UpdateMatchPositionTable from '../../components/UpdateTables/UpdateMatchPositionTable'
import UpdateMatchTable from '../../components/UpdateTables/UpdateMatchTable'
import UpdateResultTable from '../../components/UpdateTables/UpdateResultTable'
import UpdateSeasonTable from '../../components/UpdateTables/UpdateSeasonTable'
import UpdateTeamTable from '../../components/UpdateTables/UpdateTeamTable'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import DeleteAddressTable from '../../components/DeleteTables/DeleteAddressTable'
import DeleteContactTable from '../../components/DeleteTables/DeleteContactTable'
import DeleteGoalTypeTable from '../../components/DeleteTables/DeleteGoalTypeTable'
import DeleteLocationTable from '../../components/DeleteTables/DeleteLocationTable'
import DeleteMatchGoalTable from '../../components/DeleteTables/DeleteMatchGoalTable'
import DeleteMatchPositionTable from '../../components/DeleteTables/DeleteMatchPositionTable'
import DeleteMatchTable from '../../components/DeleteTables/DeleteMatchTable'
import DeletePersonTable from '../../components/DeleteTables/DeletePersonTable'
import DeleteTeamTable from '../../components/DeleteTables/DeleteTeamTable'
import DeleteUserTable from '../../components/DeleteTables/DeleteUsersTable'
import UpdatePlayerTable from '../../components/UpdateTables/UpdatePlayerTable'

import Collapsible from 'react-collapsible';

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            status: 0,
            showCreate: false
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
                <NavigationBar></NavigationBar>
                <h1 className="text-center">Dashboard</h1>
                <div className="row">
                    {sessionStorage.getItem("role") ?
                        <div className="col-4">
                            <ul className="list-group text-center">
                                <Collapsible trigger="Create" id="button">
                                    <div onClick={this.setStatus.bind(this, 1)}><li className="list-group-item" id="button">Create Person</li></div>
                                    <div onClick={this.setStatus.bind(this, 2)}><li className="list-group-item" id="button">Create Address</li></div>
                                    <div onClick={this.setStatus.bind(this, 4)}><li className="list-group-item" id="button">Create Contact</li></div>
                                    <div onClick={this.setStatus.bind(this, 5)}><li className="list-group-item" id="button">Create GoalType</li></div>
                                    <div onClick={this.setStatus.bind(this, 6)}><li className="list-group-item" id="button">Create Location</li></div>
                                    <div onClick={this.setStatus.bind(this, 7)}><li className="list-group-item" id="button">Create Match Goal</li></div>
                                    <div onClick={this.setStatus.bind(this, 8)}><li className="list-group-item" id="button">Create Match Position</li></div>
                                    <div onClick={this.setStatus.bind(this, 9)}><li className="list-group-item" id="button">Create Match</li></div>
                                    <div onClick={this.setStatus.bind(this, 10)}><li className="list-group-item" id="button">Create Result</li></div>
                                    <div onClick={this.setStatus.bind(this, 11)}><li className="list-group-item" id="button">Create Season</li></div>
                                    <div onClick={this.setStatus.bind(this, 12)}><li className="list-group-item" id="button">Create Team</li></div>
                                    <div onClick={this.setStatus.bind(this, 38)}><li className="list-group-item" id="button">Create Player</li></div>
                                </Collapsible>
                                <Collapsible trigger="Update">
                                    <div onClick={this.setStatus.bind(this, 13)}><li className="list-group-item" id="button">Update Person</li></div>
                                    <div onClick={this.setStatus.bind(this, 14)}><li className="list-group-item" id="button">Update Address</li></div>
                                    <div onClick={this.setStatus.bind(this, 19)}><li className="list-group-item" id="button">Update Contact</li></div>
                                    <div onClick={this.setStatus.bind(this, 20)}><li className="list-group-item" id="button">Update Location</li></div>
                                    <div onClick={this.setStatus.bind(this, 21)}><li className="list-group-item" id="button">Update Match Goal</li></div>
                                    <div onClick={this.setStatus.bind(this, 22)}><li className="list-group-item" id="button">Update Match Position</li></div>
                                    <div onClick={this.setStatus.bind(this, 23)}><li className="list-group-item" id="button">Update Match</li></div>
                                    <div onClick={this.setStatus.bind(this, 24)}><li className="list-group-item" id="button">Update Result</li></div>
                                    <div onClick={this.setStatus.bind(this, 25)}><li className="list-group-item" id="button">Update Season</li></div>
                                    <div onClick={this.setStatus.bind(this, 26)}><li className="list-group-item" id="button">Update Team</li></div>
                                    <div onClick={this.setStatus.bind(this, 39)}><li className="list-group-item" id="button">Update Player</li></div>
                                </Collapsible>
                                <Collapsible trigger="Delete">
                                    <div onClick={this.setStatus.bind(this, 27)}><li className="list-group-item" id="button">Delete Address</li></div>
                                    <div onClick={this.setStatus.bind(this, 29)}><li className="list-group-item" id="button">Delete Contact</li></div>
                                    <div onClick={this.setStatus.bind(this, 30)}><li className="list-group-item" id="button">Delete Goal Type</li></div>
                                    <div onClick={this.setStatus.bind(this, 31)}><li className="list-group-item" id="button">Delete Location</li></div>
                                    <div onClick={this.setStatus.bind(this, 32)}><li className="list-group-item" id="button">Delete Match Goal</li></div>
                                    <div onClick={this.setStatus.bind(this, 33)}><li className="list-group-item" id="button">Delete Match Position</li></div>
                                    <div onClick={this.setStatus.bind(this, 34)}><li className="list-group-item" id="button">Delete Match</li></div>
                                    <div onClick={this.setStatus.bind(this, 35)}><li className="list-group-item" id="button">Delete Person</li></div>
                                    <div onClick={this.setStatus.bind(this, 36)}><li className="list-group-item" id="button">Delete Team</li></div>
                                    <div onClick={this.setStatus.bind(this, 37)}><li className="list-group-item" id="button">Delete User</li></div>
                                </Collapsible> 
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
                            19: <UpdateContactTable></UpdateContactTable>,
                            20: <UpdateLocationTable></UpdateLocationTable>,
                            21: <UpdateMatchGoalTable></UpdateMatchGoalTable>,
                            22: <UpdateMatchPositionTable></UpdateMatchPositionTable>,
                            23: <UpdateMatchTable></UpdateMatchTable>,
                            24: <UpdateResultTable></UpdateResultTable>,
                            25: <UpdateSeasonTable></UpdateSeasonTable>,
                            26: <UpdateTeamTable></UpdateTeamTable>,
                            27: <DeleteAddressTable></DeleteAddressTable>,
                            29: <DeleteContactTable></DeleteContactTable>,
                            30: <DeleteGoalTypeTable></DeleteGoalTypeTable>,
                            31: <DeleteLocationTable></DeleteLocationTable>,
                            32: <DeleteMatchGoalTable></DeleteMatchGoalTable>,
                            33: <DeleteMatchPositionTable></DeleteMatchPositionTable>,
                            34: <DeleteMatchTable></DeleteMatchTable>,
                            35: <DeletePersonTable></DeletePersonTable>,
                            36: <DeleteTeamTable></DeleteTeamTable>,
                            37: <DeleteUserTable></DeleteUserTable>,
                            38: <CreatePlayerTable></CreatePlayerTable>,
                            39: <UpdatePlayerTable></UpdatePlayerTable>

                        }[this.state.status]}
                    </div>
                </div>
            </div>
        )
    }
}

export default Dashboard