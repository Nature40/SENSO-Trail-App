import { createSelector } from 'reselect'

function selectTrailsList (state) {
  return Object.keys(state.trails.byUuid).map((key, index) => {
    return state.trails.byUuid[key]
  })
}

export const getTrailsList = createSelector(
  [selectTrailsList],
  (trails) => trails
)

export function selectCurrentTrailId (state) {
  return state.trails.current_trail
}

export function selectTrailsByUuid (state) {
  return state.trails.byUuid
}

export function selectCurrentTrailsStation (state) {
  return state.trails.currentStation
}

export const getCurrentTrail = createSelector(
  [selectTrailsByUuid, selectCurrentTrailId],
  (trails, uuid) => trails[uuid]
)

