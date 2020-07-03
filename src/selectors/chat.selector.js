import { createSelector } from 'reselect'

export function selectChatMessages (state) {
  return state.chat.messageQueue
}

export function selectChatLastReadIndex (state) {
  return state.chat.lastRead
}

export function selectChatOptions (state) {
  return state.chat.chatOptions
}

export const getChatLastReadIndex = createSelector(
  [selectChatLastReadIndex],
  index => index,
)
export const getUnreadMessageCount = createSelector(
  [selectChatLastReadIndex, selectChatMessages],
  (lastIndex, messages)=> messages.length - (lastIndex + 1),
)

export const getChatMessages = createSelector(
  [selectChatMessages],
  (messages) => messages
)

export const getChatOptions = createSelector(
  [selectChatOptions],
  (options) => options
)
