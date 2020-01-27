import { connect } from 'react-redux'

import MessageDisplay from '../components/messageDisplay.js'

import { getNewestMessages } from '../selectors/message.selector.js'

const mapStateToProps = state => {
  return {
    messages: getNewestMessages(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

const Messages = connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDisplay)

export default Messages
