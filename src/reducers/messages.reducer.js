import {
  ADD_MESSAGE
} from '../constants/messages.constatns.js'

export const initialState = {
  byUuid: {}
}

export default function messages (state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            messageType: action.messageType,
            text: action.text,
            timestamp: action.timestamp,
            uuid: action.uuid
          }
        }
      }
    default:
      return state
  }
}
