import {
  LOAD_STATION_START,
  LOAD_STATION_SUCCESS,
  LOAD_STATION_FAIL

} from '../constants/station.constants.js'

export const initialState = {
  byUuid: {},
  loading: false
}

function stations (state = initialState, action) {
  switch (action.type) {
    case LOAD_STATION_START:
      return {
        ...state,
        loading: true
      }
    case LOAD_STATION_FAIL:
      return {
        ...state,
        loading: false
      }
    case LOAD_STATION_SUCCESS:
      return {
        ...state,
        loading: false,
        byUuid: { ...state.byUuid, ...action.transformedStations }
      }
    default:
      return state
  }
}

export default stations
