
export function selectStationList (state) {
  return Object.keys(state.station.byUuid).map((key, index) => {
    return state.station.byUuid[key]
  })
}
