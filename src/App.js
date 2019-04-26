import React, { Component } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar/NavigationBar'
import MatchViewer from './containers/MatchViewer/MatchViewer'

class App extends Component {
  render() {
    return (
      <div className="container text-center">
        <NavigationBar path="/"></NavigationBar>
        <MatchViewer></MatchViewer>
      </div>
    );
  }
}

export default App;
