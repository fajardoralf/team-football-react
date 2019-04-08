import React from 'react';
import CreateLocation from '../../components/Dashboard/createLocation';
import CreatePerson from '../../components/Dashboard/createPerson';
import CreateTeam from '../../components/Dashboard/createTeam';
import EditPerson from '../../components/Dashboard/editPerson';


class Dashboard extends React.Component {

    render() {
        return (
            <div className="DashboardOwner text-center">
                <div className="row mt-5">
                    <div className="col-2">
                        <h1>Dashboard</h1>
                        <a href='/' className='btn btn-info'>Back</a>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3 className="mt-5">Edit User</h3>
                        <EditPerson/>
                    </div>
                    <div className="col">
                        <h3 className="mt-5">Create Person</h3>
                        <CreatePerson/>
                    </div>
                    <div className="col">
                        <h3 className="mt-5">Create Team</h3>
                        <CreateTeam/>
                    </div>
                    <div className="col">
                        <h3 className="mt-5">Create Location</h3>
                        <CreateLocation/>
                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard