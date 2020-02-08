import {
  ADD_MESSAGE
} from '../constants/messages.constatns.js'

/*
 * @param {MessageType} messageType
 * @param {String} text
 * @return {Object}
 */
export function addMessage (messageType, text, timestamp = null) {
  if (timestamp === null){
    timestamp = Date.now()
  }
  return {
    type: ADD_MESSAGE,
    messageType,
    text,
    timestamp
  }
}
