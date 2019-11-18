import {
  LOAD_ACTIVITIES_START,
  LOAD_ACTIVITIES_SUCCESS
} from '../constants/activity.constants.js'

export function loadActivity (uuids) {
  return {
    type: LOAD_ACTIVITIES_START,
    uuids
  }
}

export function loadActivitySuccess (transformedActivities) {
  return {
    type: LOAD_ACTIVITIES_SUCCESS,
    transformedActivities
  }
}
