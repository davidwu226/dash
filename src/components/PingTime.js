import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core/'

const styles = theme => ({
  colorDisabled: {
    color: theme.palette.primary.dark
  }
})

class PingTime extends React.Component {

  render() {
    const { classes, pingTime } = this.props
    return (
      <div>
        <Typography variant='subtitle1' color={pingTime >= 0 ? 'inherit' : 'secondary'} classes={{ colorSecondary: classes.colorDisabled }}>
          {pingTime >= 0 ? <p>{pingTime}ms</p> : <p>0ms</p>}
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(PingTime)
