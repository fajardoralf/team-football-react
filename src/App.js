import React, { Component } from 'react';
import './App.css';
import Login from './containers/Login/Login'

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
            <Login/>
        </div>
      </div>
    );
  }
}

export default App;
