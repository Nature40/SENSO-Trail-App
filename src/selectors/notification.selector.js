import { createSelector } from 'reselect'

export function selectNotificationPermission (state) {
  return state.notification.allowed
}

export const getNotificationPermission = createSelector(
  [selectNotificationPermission],
  (allowed) => allowed
)
 
