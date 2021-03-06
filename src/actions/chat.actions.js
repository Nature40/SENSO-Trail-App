import {
  ADD_CHAT_MESSAGE,
  CHOOSE_CHAT_OPTION,
  SET_CHAT_OPTIONS,
  JUMP_TO_SCENE,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  LOAD_INK_JSON_FAIL,
  MARK_MESSAGE_READ
} from '../constants/chat.constants.js'

/**
 * @param {string} sceneId - scene identification
 */
export function jumpToScene (sceneId){
  return {
    type: JUMP_TO_SCENE,
    sceneId
  }
}

/**
 * @param {string} message - message to display
 * @param {string} sender - sender identification
 * @param {string} audio - audio src
 */
export function addChatMessage (message, sender, tags = {}){
  return {
    type: ADD_CHAT_MESSAGE,
    message,
    sender,
    tags
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
 * @param {number} index - index of the message newest read message
 */
export function markMessageRead(index){
  return {
    type: MARK_MESSAGE_READ,
    index
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

