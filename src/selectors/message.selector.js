import { createSelector } from 'reselect'
import {
  LAST_MESSAGE_COUNT,
  MESSAGE_TIME_IN_SECONDS
} from '../constants/messages.constatns.js'

export function selectMessages (state) {
  return Object.values(state.messages.byUuid)
}

export const getNewestMessages = createSelector(
  [selectMessages],
  (messages) => messages
    .sort((a,b) => a - b)
    .filter(m => m.timestamp + MESSAGE_TIME_IN_SECONDS * 1000 >= Date.now())
    .slice(-LAST_MESSAGE_COUNT)
)
 
  /*
function sortByTimestamp(a, b) {
  a.timestamp - b.timestamp;
  //if (a is less than b by some ordering criterion) {
  if(a,timestamp)
    return -1;
  }
  if (a is greater than b by the ordering criterion) {
    return 1;
  }
  // a must be equal to b
  return 0;
}*/
