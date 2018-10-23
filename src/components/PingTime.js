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
          <p>{pingTime >= 0 ? `${pingTime}ms` : '0ms'}&nbsp;&nbsp;&nbsp;</p>
        </Typography>
      </div>
    )
  }
}

export default withStyles(styles)(PingTime)
