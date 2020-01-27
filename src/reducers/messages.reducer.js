import {
  ADD_MESSAGE
} from '../constants/messages.constatns.js'

export const initialState = {
  messages: []
}

export default function messages (state = initialState, action) {
  switch(action.type) {
    case ADD_MESSAGE: 
      return {
        messages: [
          ...state.messages,
          {
            messageType: action.messageType,
            text: action.text
          }
        ]
      }
    default: 
      return state
  }
}
