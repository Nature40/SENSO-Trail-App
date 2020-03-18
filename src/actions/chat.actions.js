import {
  ADD_CHAT_MESSAGE
} from '../constants/chat.constants.js'

export function addChatMessage(message, sender){
  return {
    type: ADD_CHAT_MESSAGE,
    message,
    sender
  }
}
