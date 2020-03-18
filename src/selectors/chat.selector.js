import { createSelector } from 'reselect'

export function selectChatMessages (state) {
  return state.chat.messageQueue
}

export const getChatMessages = createSelector(
  [selectChatMessages],
  (messages) => messages
)
