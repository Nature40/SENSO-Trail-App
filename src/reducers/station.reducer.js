import {
  LOAD_STATION_START,
  LOAD_STATION_SUCCESS,
  LOAD_STATION_FAIL,
  UNLOCK_STATION_SUCCESS
} from '../constants/station.constants.js'

export const initialState = {
  byUuid: {},
  slugToUuid: {},
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
        byUuid: { ...state.byUuid, ...action.transformedStations },
        slugToUuid: { ...state.slugToUuid, ...action.slugToUuid}
      }
    case UNLOCK_STATION_SUCCESS:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            unlocked: true
          }
        }
      }
    default:
      return state
  }
}

export default stations
