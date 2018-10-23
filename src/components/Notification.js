import _ from 'lodash'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import MailIcon from '@material-ui/icons/Mail'
import {
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Button,
  Slide,
} from '@material-ui/core/'
import WarningIcon from '@material-ui/icons/Warning'
import InfoIcon from '@material-ui/icons/Info'
import ErrorIcon from '@material-ui/icons/Error'

import ScrollableFeed from 'react-scrollable-feed'
import { withSnackbar } from 'notistack'

const styles = theme => ({
  dialog: {
    width: '50vw',
    height: '50vh',
  }
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Notification extends React.Component {
  state = {
    messages: [],
    readCount: 0,
    open: false,
  }

  handleClose = () => {
    this.setState({ ...this.state, open: false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      messages: nextProps.messages,
      readCount: (this.state.open && nextProps.messages.length) || this.state.readCount
    })

    if (nextProps.latest) {
      this.props.enqueueSnackbar(nextProps.latest.message, { variant: nextProps.latest.variant })
    }
  }

  handleClick = () => {
    this.setState({
      ...this.state,
      readCount: this.state.messages.length,
      open: true,
    })
  }

  render() {
    const { classes } = this.props
    const { messages, open } = this.state

    const count = (messages && messages.length) || 0
    const unread = Math.max(0, count - this.state.readCount)

    const icon = {
      'warning': <WarningIcon nativeColor='orange'/>,
      'error': <ErrorIcon nativeColor='red'/>,
    }
    return (
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby='alert-dialog-slide-title'
          aria-describedby='alert-dialog-slide-description'>
          <DialogTitle id='alert-dialog-slide-title'>
            {"Messages"}
          </DialogTitle>
          <DialogContent className={classes.dialog}>
            <ScrollableFeed>
            <List>
              {_.map(messages, (m, i) => {
                return (
                  <ListItem divider key={i}>
                    <ListItemIcon>
                      {icon[m.variant] || <InfoIcon nativeColor='green'/>}
                    </ListItemIcon>
                    <ListItemText primary={m.message} secondary='something....\nsomething!'/>
                  </ListItem>
                )
              })}
            </List>
          </ScrollableFeed>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Dismiss
            </Button>
          </DialogActions>
        </Dialog>
        {unread ? <Badge badgeContent={unread} color='secondary'>
          <MailIcon fontSize="large" onClick={this.handleClick}/>
        </Badge> : <MailIcon fontSize="large" color='disabled' onClick={this.handleClick}/>}
        &nbsp;&nbsp;&nbsp;
      </div>
    )
  }
}

export default withSnackbar(withStyles(styles)(Notification))
