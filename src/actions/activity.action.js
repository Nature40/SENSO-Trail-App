import {
  LOAD_ACTIVITIES_START,
  LOAD_ACTIVITIES_SUCCESS,
  COMPLETE_ACTIVITY
} from '../constants/activity.constants.js'

/**
 * @param {String[]} uuids - uuids of activities to load
 */
export function loadActivity (uuids) {
  return {
    type: LOAD_ACTIVITIES_START,
    uuids
  }
}

/**
 * @param {Object} transformedActivities - Activities transformed into a key value pair Object
 */
export function loadActivitySuccess (transformedActivities, slugToUuid) {
  return {
    type: LOAD_ACTIVITIES_SUCCESS,
    transformedActivities,
    slugToUuid
  }
}

/**
 * @param {string} uuid - the uuid of the activity
 */
export function completeActivity (uuid) {
  return {
    type: COMPLETE_ACTIVITY,
    uuid
  }
}
