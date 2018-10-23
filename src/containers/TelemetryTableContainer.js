import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import TelemetryTable from '../components/TelemetryTable'
import { addTelemetry } from '../state/Telemetry'
import { changeGraphs } from '../state/Graph'

class TelemetryTableContainer extends React.Component {
  componentDidMount() {
    setInterval(() => {
      this.props.addTelemetry('x', Math.floor(Math.random()*300))
      this.props.addTelemetry('y', Math.floor(Math.random()*300))
    }, 1000)
  }

  render() {
    const { telemetry, className, classes, style } = this.props
    return <TelemetryTable telemetry={telemetry} onChange={(selected) => { this.props.changeGraphs(_.mapValues(selected, { color: 'red' })) }} className={className} classes={classes} style={style} />
  }
}

function mapStateToProps(state) {
  return {
    telemetry: state.Telemetry.view.telemetry
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addTelemetry: (name, value) => dispatch(addTelemetry(name, value)),
    changeGraphs: (graphs) => dispatch(changeGraphs(graphs)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TelemetryTableContainer)
