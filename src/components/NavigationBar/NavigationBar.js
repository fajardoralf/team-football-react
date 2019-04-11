import React from 'react';


class NavigationBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {

    return (
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="NavigationBar">
        <a class="navbar-brand" href="#">Football Manager</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Dashboard</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">About</a>
            </li>
          </ul>
          <span class="navbar-text">
            <a class="nav-link" href="#">Logout</a>
          </span>
        </div>
      </nav>
    );
  }
}
export default NavigationBar;