import React, { Component } from 'react';
import './App.css';
import Navbar from './containers/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
      </div>
    );
  }
}

export default App;
