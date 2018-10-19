import React from 'react'
import { connect } from 'react-redux'
import Connectivity from '../components/Connectivity'

class ConnectivityContainer extends React.Component {
  render() {
    const { connected } = this.props
    return <Connectivity connected={connected}/>
  }
}

function mapStateToProps(state) {
  return {
    connected: state.Network.connected,
  }
}

export default connect(mapStateToProps)(ConnectivityContainer)
