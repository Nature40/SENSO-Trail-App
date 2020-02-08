import { createSelector } from 'reselect'
import {
  LAST_MESSAGE_COUNT,
  MESSAGE_TIME_IN_SECONDS
} from '../constants/messages.constatns.js'

export function selectMessages (state) {
  return state.messages.messages
}

export const getNewestMessages = createSelector(
  [selectMessages],
  (messages) => messages
    .filter(m => m.timestamp + MESSAGE_TIME_IN_SECONDS * 1000 >= Date.now())
    .slice(-LAST_MESSAGE_COUNT)
)

