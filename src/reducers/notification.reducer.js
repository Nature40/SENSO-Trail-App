import {
  SET_NOTIFICATION_PERMISSION
} from '../constants/notification.constants.js'

export const initialState = {
  allowed: false
}

export default function notification (state = initialState, action) {
  switch (action.type) {
    case SET_NOTIFICATION_PERMISSION:
      return {
        ...state,
        allowed: action.allowed
      }
    default:
      return state
  }
}
