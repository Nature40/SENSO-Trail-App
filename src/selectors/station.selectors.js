import { createSelector } from 'reselect'

function selectStation (state, { uuid }) {
  return state.station.byUuid[uuid]
}

export const getStation = createSelector(
  [selectStation],
  (station) => station
)
