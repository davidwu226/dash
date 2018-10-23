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
    return (
      <React.Fragment>
        <div className={classes.wrapper}>
          <Table className={classes.root} style={style}>
            <TableBody>
              {_.map(telemetry, (value, key) => {
                return (
                  <TableRow key={key} role='checkbox' selected={this.state.selected[key]} onClick={event => this.handleClick(event, key)}>
                    <TableCell padding='checkbox'>
                      <Checkbox checked={this.state.selected[key] === true}/>
                    </TableCell>
                    <TableCell component='th' scope='row' padding='none'>
                      {key}
                    </TableCell>
                    <TableCell numeric>
                      {value.value}
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
