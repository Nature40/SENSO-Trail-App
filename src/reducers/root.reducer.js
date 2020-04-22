import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import messages, { initialState as messagesState } from './messages.reducer.js'
import chat, { initialState as chatState } from './chat.reducer.js'
import resources, { initialState as resourceState } from './resources.reducer.js'

export const initialState = {
  messages: messagesState,
  chat: chatState,
  resources: resourceState
}

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    messages,
    chat,
    resources
  })
}
