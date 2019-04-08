import React, { Component } from 'react';
import './App.css';
import Navbar from './containers/Navbar/Navbar'

class App extends Component {
  render() {
    return (
      <div className="text-center">
        <Navbar />
      </div>
    );
  }
}

export default App;
