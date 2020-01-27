import { createSelector } from 'reselect'

const lastMessageCount = 3

export function selectMessages (state) {
  return state.messages.messages
}

export const getNewestMessages = createSelector(
  [selectMessages],
  (messages) => messages.slice(0,lastMessageCount)
)
