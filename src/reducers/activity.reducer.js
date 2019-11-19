import {
  ACTIVITY_TYPE_TEXT,
  ACTIVITY_TYPE_MULTI_CHOICE,
  LOAD_ACTIVITIES_START,
  LOAD_ACTIVITIES_FAIL,
  LOAD_ACTIVITIES_SUCCESS
} from '../constants/activity.constants.js'

import textActivity from './textActivity.reducer.js'

import multiChoiceActivity from './multiChoiceActivity.reducer.js'

export const initialState = {
  byUuid: {},
  loading: false
}

export default function activity (state = initialState, action) {
  switch (action.type) {
    case LOAD_ACTIVITIES_START:
      return {
        ...state,
        loading: true
      }
    case LOAD_ACTIVITIES_FAIL:
      return {
        ...state,
        loading: false
      }
    case LOAD_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        byUuid: {
          ...state.byUuid,
          ...action.transformedActivities
        }
      }
    default:
      switch (action.activityType) {
        case ACTIVITY_TYPE_TEXT:
          return textActivity(state, action)
        case ACTIVITY_TYPE_MULTI_CHOICE:
          return multiChoiceActivity(state, action)
        default:
          return state
      }
  }
}
