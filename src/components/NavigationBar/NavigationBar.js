import React from 'react';
import Login from '../Login/Login'

class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

 

  render() {

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark" id="NavigationBar">
        <a className="navbar-brand" href="/">Football Manager</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/dashboard">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">About</a>
            </li>
          </ul>
          <span className="navbar-text">

          </span>
        </div>
        <Login />
      </nav>
    );
  }
}
export default NavigationBar;