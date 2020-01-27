import {
  ADD_MESSAGE
} from '../constants/messages.constatns.js'

/*
 * @param {MessageType} messageType
 * @param {String} text
 * @return {Object}
 */
export function addMessage (messageType, text) {
  return {
    type: ADD_MESSAGE,
    messageType,
    text,
  }
}
