import {
  LOAD_RESOURCE_START,
  LOAD_RESOURCE_SUCCESS,
  LOAD_RESOURCE_FAIL,
  ADD_RESOURCE,
  SET_SW_ACTIVE,
  RESOURCE_TYPE_STATION
} from '../constants/resources.constants.js'

export const initialState = {
  stations: {},
  serviceWorkerActive: false,
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
    case SET_SW_ACTIVE:
      return {
        ...state,
        serviceWorkerActive: action.active
      }
    case LOAD_RESOURCE_SUCCESS:
      return addResourceByType({...state, loading:false}, action)
    case ADD_RESOURCE:
      return addResourceByType(state, action)
    default:
      return state
  }
}

function addResourceByType(state, action) {
  switch(action.resourceType) {
    case RESOURCE_TYPE_STATION:
      return {
        ...state,
        stations: { ...state.stations, ...action.resource},
      }
    default:
      return state
  }
}

export default resources
