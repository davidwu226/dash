import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from '@material-ui/core/'
import NavBar from './components/NavBar'
import './App.css'
import { SnackbarProvider } from 'notistack'

class App extends Component {
  render() {
    return (
      <SnackbarProvider action={[
        <Button color="secondary" size="small">Dismiss</Button>]}>
        <div>
          <NavBar/>
        </div>
      </SnackbarProvider>
    );
  }
}

export default connect()(App)
