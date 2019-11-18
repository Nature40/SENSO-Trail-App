import { createSelector } from 'reselect'

function selectActivity (state, { uuid }) {
  return state.activity.byUuid[uuid]
}

export const getActivity = createSelector(
  [selectActivity],
  (activity) => activity
)

export const getActivityType = createSelector(
  [selectActivity],
  (activity) => activity.activityType
)
