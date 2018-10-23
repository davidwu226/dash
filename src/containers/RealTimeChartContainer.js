import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import RealTimeChart from '../components/RealTimeChart'
import { addGraph } from '../state/Graph'

class RealTimeChartContainer extends React.Component {
  render() {
    const { data, className, classes, style } = this.props
    return <RealTimeChart data={data} className={className} classes={classes} style={style} />
  }
}

function mapStateToProps(state) {
  const series = _.map(state.Graph,
    (color, name) => _.map(state.Telemetry.telemetry[name],
      (d) => ({ x: d.time, y: d.value })).slice(-10))
  return {
    data: {
      series,
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addGraph: data => dispatch(addGraph(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeChartContainer)
