import {
  ADD_CHAT_MESSAGE
} from '../constants/chat.constants.js'

export const initialState = {
  messageQueue: []
}

export default function chat (state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT_MESSAGE:
      return {
        ...state,
        messageQueue: state.messageQueue.concat([{
          message: action.message,
          sender: action.sender
        }])
      }
    default:
      return state
  }
}
