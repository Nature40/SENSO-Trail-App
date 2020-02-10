import { connect } from 'react-redux'

import MessageDisplay from '../components/messageDisplay.js'

import { getNewestMessages } from '../selectors/message.selector.js'

import { hideMessage } from '../actions/messages.actions.js'

const mapStateToProps = state => {
  return {
    messages: getNewestMessages(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onMessageRead: (uuid) => dispatch(hideMessage(uuid))
  }
}

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDisplay)

export default Messages
