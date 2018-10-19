import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import WifiIcon from '@material-ui/icons/Wifi'
import WifiOffIcon from '@material-ui/icons/WifiOff'

const styles = theme => ({
})

class Connectivity extends React.Component {

  render() {
    const { connected } = this.props
    return (
      <div>
        {connected ? <WifiIcon fontSize='large'/> : <WifiOffIcon color='disabled' fontSize='large'/>}
      </div>
    )
  }
}

export default withStyles(styles)(Connectivity)
