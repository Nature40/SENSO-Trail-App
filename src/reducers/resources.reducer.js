import {
  LOAD_RESOURCE_START,
  LOAD_RESOURCE_SUCCESS,
  LOAD_RESOURCE_FAIL,
} from '../constants/resources.constants.js'

export const initialState = {
  stations: {},
  loading: false
}

function resources (state = initialState, action) {
  switch (action.type) {
    case LOAD_RESOURCE_START:
      return {
        ...state,
        loading: true
      }
    case LOAD_RESOURCE_FAIL:
      return {
        ...state,
        loading: false
      }
    case LOAD_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        stations: { ...state.stations, ...action.transformedResources},
      }
    default:
      return state
  }
}

export default resources
