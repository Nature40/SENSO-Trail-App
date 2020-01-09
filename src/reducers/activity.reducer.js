import {
  ACTIVITY_TYPE_TEXT,
  ACTIVITY_TYPE_MULTI_CHOICE,
  LOAD_ACTIVITIES_START,
  LOAD_ACTIVITIES_FAIL,
  LOAD_ACTIVITIES_SUCCESS,
  LOAD_RESOURCE_START,
  LOAD_RESOURCE_SUCCESS,
  LOAD_RESOURCE_FAIL,
  COMPLETE_ACTIVITY
} from '../constants/activity.constants.js'

import multiChoiceActivity from './multiChoiceActivity.reducer.js'

export const initialState = {
  byUuid: {},
  slugToUuid: {},
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
        },
        slugToUuid: {
          ...state.slugToUuid,
          ...action.slugToUuid
        }
      }
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
        loading: false
      }
    case COMPLETE_ACTIVITY:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            completed: true
          }
        }
      }
    default:
      switch (action.activityType) {
        case ACTIVITY_TYPE_MULTI_CHOICE:
          return multiChoiceActivity(state, action)
        default:
          return state
      }
  }
}
