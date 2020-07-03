import { connect } from 'react-redux'

import ChatButtonView from '../components/ChatButton.view.js'
import ChatView from '../components/Chat.view.js'
import ChatTool from '../components/chatToolbar.component.js'

import { 
  chooseChatOption,
  markMessageRead
} from '../actions/chat.actions.js'

import { 
  getChatMessages,
  getChatOptions,
  getChatLastReadIndex,
  getUnreadMessageCount
} from '../selectors/chat.selector.js'

const mapStateToProps = state => {
  return {
    messages: getChatMessages(state),
    chatOptions: getChatOptions(state),
    lastReadIndex: getChatLastReadIndex(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    markMessagesRead: (i) => dispatch(markMessageRead(i))
  }
}

const Chat = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatView)

export default Chat

function mapStateToToolbarProps (state) {
  return {
    chatOptions: getChatOptions(state)
  }
}

const mapDispatchToToolbarProps = dispatch => {
  return {
    onSendMessage: (option) => dispatch(chooseChatOption(option))
  }
}

export const ChatToolbar = connect(
  mapStateToToolbarProps,
  mapDispatchToToolbarProps,
)(ChatTool)

function mapStateToButtonProps (state) {
  return {
    unreadMessageCount: getUnreadMessageCount(state)
  }
}

const mapDispatchToButtonProps = dispatch => {
  return {
  }
}

export const ChatButton = connect(
  mapStateToButtonProps,
  mapDispatchToButtonProps,
)(ChatButtonView)

