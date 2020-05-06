import {
  ADD_CHAT_MESSAGE,
  SET_CHAT_OPTIONS,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  LOAD_INK_JSON_FAIL
} from '../constants/chat.constants.js'

export const initialState = {
  messageQueue: [],
  jsonFile: undefined,
  loading: false,
  chatOptions: [{text: 'Start', index: -1}]
}

export default function chat (state = initialState, action) {
  switch (action.type) {
    case ADD_CHAT_MESSAGE:
      return {
        ...state,
        messageQueue: state.messageQueue.concat([{
          message: action.message,
          sender: action.sender,
          tags: { ...action.tags}
        }])
      }
    case SET_CHAT_OPTIONS:
      return {
        ...state,
        chatOptions: action.options.map(o => { return { ...o } })
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
