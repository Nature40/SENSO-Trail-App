import {
} from '../constants/textActivity.constants.js'

export const initialState = {
  byUuid: {}
}

export default function multiChoiceActivityCase (state = initialState, action) {
  switch (action.type) {
    /*case CLOSE_TEXT:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            open: false
          }
        }
      }*/
    default:
      return state
  }
}
