import { createSelector } from 'reselect'

export function selectStation (state, { uuid }) {
  return state.station.byUuid[uuid]
}


export const getStation = createSelector(
  [selectStation],
  (station) => station
)

export function selectStations (state) {
  return state.station.byUuid
}

function selectStationUuidBySlug (state, { slug }) {
  return state.station.slugToUuid[slug]
}

export const getStationBySlug = createSelector(
  [selectStations, selectStationUuidBySlug],
  (stations, uuid) => stations[uuid]
)
