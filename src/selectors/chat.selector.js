import { createSelector } from 'reselect'

export function selectChatMessages (state) {
  return state.chat.messageQueue
}

export function selectChatOptions (state) {
  return state.chat.chatOptions
}

export const getChatMessages = createSelector(
  [selectChatMessages],
  (messages) => messages
)

export const getChatOptions = createSelector(
  [selectChatOptions],
  (options) => options
)
