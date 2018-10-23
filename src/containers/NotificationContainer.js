import _ from 'lodash'
import React from 'react'
import { connect } from 'react-redux'
import Notification from '../components/Notification'
import { addMessage } from '../state/Message'

class NotificationContainer extends React.Component {
  componentDidMount() {
    let c = 0
   setInterval(() => {
      this.props.addMessage(`Hello! ${++c}`)
    }, 10000)
  }

  render() {
    const { messages, latest, classes, className, style } = this.props
    return <Notification messages={messages} latest={latest} classes={classes} className={className} style={style} />
  }
}

function mapStateToProps(state) {
  return {
    messages: state.Message.messages,
    latest: state.Message.view.latest,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addMessage: data => dispatch(addMessage(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationContainer)
