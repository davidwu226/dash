import React from 'react'
import { connect } from 'react-redux'
import Connectivity from '../components/Connectivity'

class ConnectivityContainer extends React.Component {
  render() {
    const { connected, ...others } = this.props
    return <Connectivity connected={connected} {...others} />
  }
}

function mapStateToProps(state) {
  return {
    connected: state.Network.connected,
  }
}

export default connect(mapStateToProps)(ConnectivityContainer)
