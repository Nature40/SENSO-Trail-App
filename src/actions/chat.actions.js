import {
  ADD_CHAT_MESSAGE,
  CHOOSE_CHAT_OPTION,
  SET_CHAT_OPTIONS,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  LOAD_INK_JSON_FAIL
} from '../constants/chat.constants.js'

/**
 * @param {string} message - message to display
 * @param {string} sender - sender identification
 */
export function addChatMessage (message, sender){
  return {
    type: ADD_CHAT_MESSAGE,
    message,
    sender
  }
}

/**
 * @param {Object[]} options 
 */
export function setChatOptions(options){
  return {
    type: SET_CHAT_OPTIONS,
    options
  }
}

/**
 * @param {number} option - index of the choose option
 */
export function chooseChatOption(option){
  return {
    type: CHOOSE_CHAT_OPTION,
    option
  }
}

/**
 * @param {string} filename  
 */
export function loadInkJsonStart(filename){
  return {
    type: LOAD_INK_JSON_START,
    filename
  }
}

/**
 * @param {string} filename  
 * @param {Object} json
 */
export function loadInkJsonSuccess(filename, json){
  return {
    type: LOAD_INK_JSON_SUCCESS,
    filename,
    json
  }
}

/**
 * @param {string} filename  
 */
export function loadInkJsonFail(filename){
  return {
    type: LOAD_INK_JSON_FAIL,
    filename
  }
}
