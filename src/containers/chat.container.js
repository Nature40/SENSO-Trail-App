import { connect } from 'react-redux'

import ChatView from '../components/Chat.view.js'
import ChatTool from '../components/chatToolbar.component.js'

import { addChatMessage } from '../actions/chat.actions.js'

import {getChatMessages} from '../selectors/chat.selector.js'

const mapStateToProps = state => {
  return {
    messages: getChatMessages(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatView)

export default Chat

function mapStateToToolbarProps (state) {
  return {
  }
}

const mapDispatchToToolbarProps = dispatch => {
  return {
    onSendMessage: (message, sender) => dispatch(addChatMessage(message, sender))
  }
}

export const ChatToolbar = connect(
  mapStateToToolbarProps,
  mapDispatchToToolbarProps,
)(ChatTool)

