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
