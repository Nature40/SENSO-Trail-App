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

function selectCurrentTrailId (state) {
  return state.trails.current_trail
}

function selectTrailsByUuid (state) {
  return state.trails.byUuid
}

export const getCurrentTrail = createSelector(
  [selectTrailsByUuid, selectCurrentTrailId],
  (trails, uuid) => trails[uuid]
)
