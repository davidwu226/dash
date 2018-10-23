import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import moment from 'moment'
import { withStyles } from '@material-ui/core/styles'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'
import { registerCallback } from '../util/resizeEvent'

const styles = theme => {
  return ({
    root: { height: '100%'},
  })
}

//
// Partitions the series by time steps.
// Find the subset of the series that are less then each time step.
//
function partitionByTimeSteps(series, startTime, timeSteps = [30*1000, 60*1000, 120*1000]) {
  const results = []
  for (let i = series.length-1; i >= 0 && timeSteps.length; --i) {
    while (timeSteps.length && (series[i].x - startTime) > timeSteps[0]) {
      results.push(series.slice(i+1))
      timeSteps.shift()
    }
  }

  while (timeSteps.length) {
    results.push(series.slice())
    timeSteps.shift()
  }
  return results
}

class RealTimeChart extends React.Component {
  constructor(props) {
    super(props)
    this.chartist = React.createRef()
  }

  componentDidMount() {
    registerCallback(()=>{
      if (this.chartist.current) {
        this.chartist.current.chartist.update()
      }
    })
  }

  render() {
    const { classes, className, data, style, startTime, } = this.props
    //const series = _.map(data.series, (s) => partitionByTimeSteps(s, startTime, [30*1000, 60*1000, 120*1000, 300*1000]))

    const options = {
      fullWidth: false,
      chartPadding: {
        right: 10
      },
      lineSmooth: Chartist.Interpolation.cardinal({
        fillHoles: false,
      }),
      axisX: {
        low: (new Date()).getTime()-10000,
        type: Chartist.FixedScaleAxis,
        divisor: 4,
        labelInterpolationFnc: function(value) {
          return (value >= startTime && `${((value-startTime) / 1000).toFixed(2)}`) || '0'
        },
      },
      axisY: {
        position: 'end',
      },
    }

    const respOptions = [
      ['(min-width: 800px)', {
        axisX: {
          low: (new Date()).getTime()-60000,
          type: Chartist.FixedScaleAxis,
          divisor: 20,
          labelInterpolationFnc: function(value) {
            return (value >= startTime && `${((value-startTime) / 1000).toFixed(2)}`) || '0'
          },
        },
      }]
    ]

    return (
      <div className={classNames(className, classes.root)} ref={(c) => { this.div = c }} classes={classes} style={style}>
        <ChartistGraph
          ref={this.chartist}
          data={data}
          options={options}
          type={'Line'}
          style={{ flex: '1 1 auto'}}
          responsiveOptions={respOptions}
        />
      </div>
    )
  }
}


export default connect()(withStyles(styles)(RealTimeChart))
