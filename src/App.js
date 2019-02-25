import React, { Component } from 'react';
import './App.css';
import AppRoute from './router/index'
import ChildRoute from './router/ChildRoute'

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppRoute />
        <ChildRoute />        
      </div>
    );
  }
}

export default App