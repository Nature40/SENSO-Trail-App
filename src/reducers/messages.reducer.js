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
          {
            messageType: action.messageType,
            text: action.text
          },
          ...state.messages
        ]
      }
    default: 
      return state
  }
}
