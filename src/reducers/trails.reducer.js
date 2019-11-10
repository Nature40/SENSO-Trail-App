import {
  LOAD_TRAILS_SUCCESS,
  LOAD_TRAILS_FAIL,
  LOAD_TRAILS_START,
  START_TRAIL_SUCCESS
} from '../constants/trails.constants.js'

export const initialState = {
  loading: false,
  byUuid: {}
}

function trails (state = initialState, action) {
  switch (action.type) {
    case LOAD_TRAILS_START:
      return {
        ...state,
        loading: true
      }
    case LOAD_TRAILS_FAIL:
      return {
        ...state,
        loading: false
      }
    case LOAD_TRAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        byUuid: { ...action.transformedTrails }
      }
    case START_TRAIL_SUCCESS:
      return {
        ...state,
        current_trail: action.trailId
      }
    default:
      return state
  }
}
export default trails
