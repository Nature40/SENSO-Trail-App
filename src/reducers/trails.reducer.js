import {
  LOAD_TRAILS_SUCCESS,
  LOAD_TRAILS_START
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
    case LOAD_TRAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        byUuid: { ...action.transformedTrails }
      }
    default:
      return state
  }
}
export default trails
