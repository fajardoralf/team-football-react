import React from "react";
import "./Dashboard.css";
import CreatePersonTable from "../../components/CreateTables/CreatePersonTable";
import CreateAddressTable from "../../components/CreateTables/CreateAddressTable";
import CreateContactTable from "../../components/CreateTables/CreateContactTable";
import CreateGoalTypeTable from "../../components/CreateTables/CreateGoalTypeTable";
import CreateLocationTable from "../../components/CreateTables/CreateLocationTable";
import CreateMatchGoalTable from "../../components/CreateTables/CreateMatchGoalTable";
import CreateMatchPositionTable from "../../components/CreateTables/CreateMatchPositionTable";
import CreateMatchTable from "../../components/CreateTables/CreateMatchTable";
import CreateResultTable from "../../components/CreateTables/CreateResultTable";
import CreateSeasonTable from "../../components/CreateTables/CreateSeasonTable";
import CreateTeamTable from "../../components/CreateTables/CreateTeamTable";
import CreatePlayerTable from "../../components/CreateTables/CreatePlayerTable";
import UpdatePersonTable from "../../components/UpdateTables/UpdatePersonTable";
import UpdateAddressTable from "../../components/UpdateTables/UpdateAddressTable";
import UpdateSelfTable from "../../components/UpdateTables/UpdateSelfTable";
import ManageWatchlist from "../../components/Dashboard/ManageWatchlist";
import SubmitCorrection from "../../components/Dashboard/SubmitCorrection";
import UpdateContactTable from "../../components/UpdateTables/UpdateContactTable";
import UpdateLocationTable from "../../components/UpdateTables/UpdateLocationTable";
import UpdateMatchGoalTable from "../../components/UpdateTables/UpdateMatchGoalTable";
import UpdateMatchPositionTable from "../../components/UpdateTables/UpdateMatchPositionTable";
import UpdateMatchTable from "../../components/UpdateTables/UpdateMatchTable";
import UpdateResultTable from "../../components/UpdateTables/UpdateResultTable";
import UpdateSeasonTable from "../../components/UpdateTables/UpdateSeasonTable";
import UpdateTeamTable from "../../components/UpdateTables/UpdateTeamTable";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import DeleteAddressTable from "../../components/DeleteTables/DeleteAddressTable";
import DeleteContactTable from "../../components/DeleteTables/DeleteContactTable";
import DeleteGoalTypeTable from "../../components/DeleteTables/DeleteGoalTypeTable";
import DeleteLocationTable from "../../components/DeleteTables/DeleteLocationTable";
import DeleteMatchGoalTable from "../../components/DeleteTables/DeleteMatchGoalTable";
import DeleteMatchPositionTable from "../../components/DeleteTables/DeleteMatchPositionTable";
import DeleteMatchTable from "../../components/DeleteTables/DeleteMatchTable";
import DeletePersonTable from "../../components/DeleteTables/DeletePersonTable";
import DeleteTeamTable from "../../components/DeleteTables/DeleteTeamTable";
import DeleteUserTable from "../../components/DeleteTables/DeleteUsersTable";
import UpdatePlayerTable from "../../components/UpdateTables/UpdatePlayerTable";
import DeletePlayerTable from "../../components/DeleteTables/DeletePlayerTable";
import UpdateUserTable from "../../components/UpdateTables/UpdateUserTable"

import Collapsible from "react-collapsible";

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
    });
  }

  render() {
    return (
      <div className="container">
        <NavigationBar />
        <div id="dashboard">
          <h1 className="text-center">Dashboard</h1>
          <div className="row">
            {sessionStorage.getItem("role") ? (
              <div className="col-4">
                <ul className="list-group text-center">
                  <Collapsible trigger="Create" id="button">
                    <div onClick={this.setStatus.bind(this, 1)}>
                      <li className="list-group-item" id="button">
                        Create Person
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 2)}>
                      <li className="list-group-item" id="button">
                        Create Address
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 4)}>
                      <li className="list-group-item" id="button">
                        Create Contact
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 5)}>
                      <li className="list-group-item" id="button">
                        Create GoalType
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 6)}>
                      <li className="list-group-item" id="button">
                        Create Location
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 7)}>
                      <li className="list-group-item" id="button">
                        Create Match Goal
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 8)}>
                      <li className="list-group-item" id="button">
                        Create Match Position
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 9)}>
                      <li className="list-group-item" id="button">
                        Create Match
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 10)}>
                      <li className="list-group-item" id="button">
                        Create Result
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 11)}>
                      <li className="list-group-item" id="button">
                        Create Season
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 12)}>
                      <li className="list-group-item" id="button">
                        Create Team
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 38)}>
                      <li className="list-group-item" id="button">
                        Create Player
                      </li>
                    </div>
                  </Collapsible>
                  <Collapsible trigger="Update">
                    <div onClick={this.setStatus.bind(this, 13)}>
                      <li className="list-group-item" id="button">
                        Update Person
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 14)}>
                      <li className="list-group-item" id="button">
                        Update Address
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 19)}>
                      <li className="list-group-item" id="button">
                        Update Contact
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 20)}>
                      <li className="list-group-item" id="button">
                        Update Location
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 21)}>
                      <li className="list-group-item" id="button">
                        Update Match Goal
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 22)}>
                      <li className="list-group-item" id="button">
                        Update Match Position
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 23)}>
                      <li className="list-group-item" id="button">
                        Update Match
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 24)}>
                      <li className="list-group-item" id="button">
                        Update Result
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 25)}>
                      <li className="list-group-item" id="button">
                        Update Season
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 26)}>
                      <li className="list-group-item" id="button">
                        Update Team
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 39)}>
                      <li className="list-group-item" id="button">
                        Update Player
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 41)}>
                      <li className="list-group-item" id="button">
                        Update User
                      </li>
                    </div>
                  </Collapsible>
                  <Collapsible trigger="Delete">
                    <div onClick={this.setStatus.bind(this, 27)}>
                      <li className="list-group-item" id="button">
                        Delete Address
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 29)}>
                      <li className="list-group-item" id="button">
                        Delete Contact
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 30)}>
                      <li className="list-group-item" id="button">
                        Delete Goal Type
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 31)}>
                      <li className="list-group-item" id="button">
                        Delete Location
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 32)}>
                      <li className="list-group-item" id="button">
                        Delete Match Goal
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 33)}>
                      <li className="list-group-item" id="button">
                        Delete Match Position
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 34)}>
                      <li className="list-group-item" id="button">
                        Delete Match
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 35)}>
                      <li className="list-group-item" id="button">
                        Delete Person
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 36)}>
                      <li className="list-group-item" id="button">
                        Delete Team
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 37)}>
                      <li className="list-group-item" id="button">
                        Delete User
                      </li>
                    </div>
                    <div onClick={this.setStatus.bind(this, 40)}>
                      <li className="list-group-item" id="button">
                        Delete Player
                      </li>
                    </div>
                  </Collapsible>
                </ul>
              </div>
            ) : (
                <ul className="list-group text-center">

                  <div onClick={this.setStatus.bind(this, 15)}>
                    <li className="list-group-item" id="button">
                      Update Info
                  </li>
                  </div>
                  <div onClick={this.setStatus.bind(this, 16)}>
                    <li className="list-group-item" id="button">
                      Manage Watchlist
                  </li>
                  </div>
                  <div onClick={this.setStatus.bind(this, 17)}>
                    <li className="list-group-item" id="button">
                      BONUS: Submit Correction
                  </li>
                  </div>

                </ul>
              )}
            <div className="col-8">
              {
                {
                  0: <div />,
                  1: <CreatePersonTable />,
                  2: <CreateAddressTable />,
                  4: <CreateContactTable />,
                  5: <CreateGoalTypeTable />,
                  6: <CreateLocationTable />,
                  7: <CreateMatchGoalTable />,
                  8: <CreateMatchPositionTable />,
                  9: <CreateMatchTable />,
                  10: <CreateResultTable />,
                  11: <CreateSeasonTable />,
                  12: <CreateTeamTable />,
                  13: <UpdatePersonTable />,
                  14: <UpdateAddressTable />,
                  15: <UpdateSelfTable personID="0" />,
                  16: <ManageWatchlist />,
                  17: <SubmitCorrection />,
                  19: <UpdateContactTable />,
                  20: <UpdateLocationTable />,
                  21: <UpdateMatchGoalTable />,
                  22: <UpdateMatchPositionTable />,
                  23: <UpdateMatchTable />,
                  24: <UpdateResultTable />,
                  25: <UpdateSeasonTable />,
                  26: <UpdateTeamTable />,
                  27: <DeleteAddressTable />,
                  29: <DeleteContactTable />,
                  30: <DeleteGoalTypeTable />,
                  31: <DeleteLocationTable />,
                  32: <DeleteMatchGoalTable />,
                  33: <DeleteMatchPositionTable />,
                  34: <DeleteMatchTable />,
                  35: <DeletePersonTable />,
                  36: <DeleteTeamTable />,
                  37: <DeleteUserTable />,
                  38: <CreatePlayerTable />,
                  39: <UpdatePlayerTable />,
                  40: <DeletePlayerTable />,
                  41: <UpdateUserTable />
                }[this.state.status]
              }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
