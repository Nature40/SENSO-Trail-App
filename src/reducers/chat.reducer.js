import {
  ADD_CHAT_MESSAGE,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  LOAD_INK_JSON_FAIL
} from '../constants/chat.constants.js'

export const initialState = {
  messageQueue: [],
  jsonFile: undefined,
  loading: false
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
    case LOAD_INK_JSON_START:
      return {
        ...state,
        loading: true
      }
    case LOAD_INK_JSON_SUCCESS:
      return {
        ...state,
        loading: false,
        jsonFile: action.json
      }
    case LOAD_INK_JSON_FAIL:
      return {
        ...state,
        loading: false,
        jsonFile: undefined
      }
    default:
      return state
  }
}
