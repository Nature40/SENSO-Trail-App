import { createSelector } from 'reselect'

export function selectSwStatus (state) {
  return state.resources.serviceWorkerActive
}

export const getServiceWorkerStatus = createSelector(
  [selectSwStatus],
  (status) => status
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
