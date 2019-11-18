import {
  OPEN_TEXT,
  CLOSE_TEXT
} from '../constants/textActivity.constants.js'

export const initialState = {
  byUuid: {}
}

export default function textActivityCase (state = initialState, action) {
  switch (action.type) {
    case OPEN_TEXT:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            open: true
          }
        }
      }
    case CLOSE_TEXT:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            open: false
          }
        }
      }
    default:
      return state
  }
}
