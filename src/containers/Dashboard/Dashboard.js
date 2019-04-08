import React from 'react';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="DashboardOwner container-fluid">
                <div className="row mt-5">
                    <div className="col-2">
                        <a href='/' className='btn btn-info'>Back</a>
                        <h1>Dashboard</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h3 className="mt-5">Edit User</h3>
                    </div>
                    <div className="col">
                        <h3 className="mt-5">Create Person</h3>
                    </div>
                    <div className="col">
                        <h3 className="mt-5">Create Team</h3>
                    </div>
                    <div className="col">
                        <h3 className="mt-5">Create Location</h3>
                    </div>

                </div>
            </div>
        )
    }
}

export default Dashboard