import {
  ADD_CHAT_MESSAGE,
  SET_CHAT_OPTIONS,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  LOAD_INK_JSON_FAIL,
  MARK_MESSAGE_READ
} from '../constants/chat.constants.js'

export const initialState = {
  messageQueue: [],
  jsonFile: undefined,
  lastRead: 0,
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
          read: false,
          tags: { ...action.tags}
        }])
      }
    case MARK_MESSAGE_READ:
      return {
        ...state,
        lastRead: action.index,
        messageQueue: state.messageQueue.map((e, i) => {
          if(i <= action.index){
            e.read = true;
          }
          return e
        })
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
        jsonFile: {
          filename: action.filename,
          data: action.json
        },   
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
