import { createSelector } from 'reselect'

export function selectActivity (state, { uuid }) {
  return state.activity.byUuid[uuid]
}

export function selectActivityUuidBySlug (state, { slug }) {
  return state.activity.slugToUuid[slug]
}

export function selectActivities (state) {
  return state.activity.byUuid
}

export const getActivity = createSelector(
  [selectActivity],
  (activity) => activity
)

export const getActivityType = createSelector(
  [selectActivity],
  (activity) => activity.activityType
)

export const getActivityBySlug = createSelector(
  [selectActivities, selectActivityUuidBySlug],
  (activities, uuid) => activities[uuid]
)

export const getActivityTypeBySlug = createSelector(
  [selectActivities, selectActivityUuidBySlug],
  (activities, uuid) => activities[uuid].activityType
)
