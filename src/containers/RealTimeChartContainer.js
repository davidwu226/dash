import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import RealTimeChart from '../components/RealTimeChart'
import { addData } from '../state/RealTimeData'

class RealTimeChartContainer extends React.Component {
  componentDidMount() {
    let c = 0
    setInterval(() => {
      this.props.addData({ time: ++c, value: Math.floor(Math.random()*300) })
      this.props.addData({ time: ++c, value: Math.floor(Math.random()*300) })
      this.props.addData({ time: ++c, value: Math.floor(Math.random()*300) })
      this.props.addData({ time: ++c, value: Math.floor(Math.random()*300) })
      this.props.addData({ time: ++c, value: Math.floor(Math.random()*300) })
    }, 100)
  }

  render() {
    const { data, ...others } = this.props
    return <RealTimeChart data={data} {...others} />
  }
}

function mapStateToProps(state) {
  const data = _.map(state.RealTimeData.data, (d) => {
    return {
      x: d.time,
      y: d.value,
    }
  }).slice(-10)
  return {
    data: {
      series: [data],
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addData: data => dispatch(addData(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RealTimeChartContainer)
