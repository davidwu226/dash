import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import ChartistGraph from 'react-chartist'
import Chartist from 'chartist'

const styles = theme => {
  return ({
    root: { height: '100%'},
  })
}

class RealTimeChart extends React.Component {
  state = { data: {} }

  componentWillReceiveProps(nextProps) {
    console.log(`recv ${nextProps}`)
    this.setState({
      ...this.state,
      ...nextProps,
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
      low: 0
    }

    console.log(JSON.stringify(this.props))
    return (
      <div className={classNames(classNames, classes.root)} ref={(c) => { this.div = c }} {...other} >
        <ChartistGraph data={data} options={options} type={'Line'} style={{ height: '100%' }}/>
      </div>
    )
  }
}


export default connect()(withStyles(styles)(RealTimeChart))
