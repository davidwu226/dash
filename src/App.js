import React, { Component } from 'react'
import { connect } from 'react-redux'
import NavBar from './components/NavBar'
import './App.css'

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
      </div>
    );
  }
}

export default connect()(App)
