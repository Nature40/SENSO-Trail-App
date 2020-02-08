import {
  ADD_MESSAGE,
  HIDE_MESSAGE
} from '../constants/messages.constatns.js'

/*
 * @param {MessageType} messageType
 * @param {String} text
 * @param {String} uuid
 * @param {number} timestamp - for injecting a timestamp if needed
 * @return {Object}
 */
export function addMessage (messageType, text, uuid, timestamp = null) {
  if (timestamp === null){
    timestamp = Date.now()
  }
  return {
    type: ADD_MESSAGE,
    messageType,
    text,
    timestamp,
    uuid
  }
}

/*
 * @param {String} uuid
 * @return {Object}
 */
export function hideMessage (uuid) {
  return {
    type: HIDE_MESSAGE,
    uuid
  }
}
