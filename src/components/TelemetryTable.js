import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
} from '@material-ui/core/'

const styles = theme => {
  return ({
    root: {},
    wrapper: {
      overflowX: 'auto',
    }
  })
}

class TelemetryTable extends React.Component {

  state = {
    selected: {},
  }

  componentWillReceiveProps(nextProps) {
    this.onChange = nextProps.onChange
  }

  handleClick = (event, id) => {
    const newState = { ...this.state, selected: { ...this.state.selected } }
    newState.selected[id] = !newState.selected[id]
    this.setState(newState)
    if (this.onChange) {
      const selected = _.reduce(newState.selected, (r, s, n) => { if (s) { r[n] = 'red' } return r }, {})
      this.onChange(selected)
    }
  }

  render() {
    const { classes, telemetry, style } = this.props

    // Copied from Chartist's settings.
    const colors = [
      '#d70206',
      '#f05b4f',
      '#f4c63d',
      '#d17905',
      '#453d3f',
      '#59922b',
      '#0544d3',
      '#6b0392',
      '#f05b4f',
      '#dda458',
      '#eacf7d',
      '#86797d',
      '#b2c326',
      '#6188e2',
      '#a748ca',
    ]

    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <Table className={classes.root} style={style}>
            <TableBody>
              {_.map(telemetry, (value, key) => {
                const tstyle =  ((this.state.selected[key]) && { color: colors.shift() }) || {}
                return (
                  <TableRow key={key} role='checkbox' selected={this.state.selected[key]} onClick={event => this.handleClick(event, key)}>
                    <TableCell padding='checkbox' width='64px'>
                      <Checkbox checked={this.state.selected[key] === true}/>
                    </TableCell>
                    <TableCell width='30%' style={tstyle} component='th' scope='row' padding='none'>
                      {key}
                    </TableCell>
                    <TableCell>
                      {value.value}
                    </TableCell>
                    <TableCell width='20%'>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </React.Fragment>
    )
  }
}

export default connect()(withStyles(styles)(TelemetryTable))
