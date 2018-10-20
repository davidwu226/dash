import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import { registerCallback } from '../util/resizeEvent'

const styles = theme => {
  return ({
    root: { height: '100%'},
  })
}

class RealTimeChart extends React.Component {
  state = { data: {} }

  constructor(props) {
    super(props)
    this.chartist = React.createRef()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      ...nextProps,
    })
  }

  componentDidMount() {
    registerCallback(()=>{
      if (this.chartist.current) {
        this.chartist.current.chartist.update()
      }
    })
  }

  render() {
    const { classes, classnames, data, ...other } = this.props
    const options = {
      fullWidth: true,
      chartPadding: {
        right: 10
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        fillHoles: true,
      }),
      low: 0,
      axisX: {
        type: Chartist.FixedScaleAxis,
        divisor: 4,
        onlyInteger: true,
      }
    }

    return (
      <div className={classNames(classNames, classes.root)} ref={(c) => { this.div = c }} {...other} >
        <ChartistGraph
          ref={this.chartist}
          data={data}
          options={options}
          type={'Line'}
          style={{ flex: '1 1 auto'}}
        />
      </div>
    )
  }
}


export default connect()(withStyles(styles)(RealTimeChart))
