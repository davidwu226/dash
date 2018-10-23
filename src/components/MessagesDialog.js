import _ from 'lodash'
import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Button,
  Slide } from '@material-ui/core/'
import { withSnackbar } from 'notistack'

const styles = theme => ({
})

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class MessagesDialog extends React.Component {
  state = {
    open: false
  }

  handleClickOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      ...this.state,
      messages: nextProps.messages,
      open: nextProps.open,
    })
  }

  render() {
    const { messages } = this.state

    return (
      <Dialog
        open={this.state.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={this.handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {"Messages"}
        </DialogTitle>

        <DialogContent>
          <List>
            {_.map(messages, (m) => {
              return (
                <ListItem>
                  <ListItemText primary={m.message}/>
                </ListItem>
              )
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Dismiss
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default withSnackbar(withStyles(styles)(MessagesDialog))
