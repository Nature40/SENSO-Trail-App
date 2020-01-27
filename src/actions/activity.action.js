import {
  LOAD_ACTIVITIES_START,
  LOAD_ACTIVITIES_SUCCESS,
  COMPLETE_ACTIVITY,
  LOAD_RESOURCE_START,
  LOAD_RESOURCE_SUCCESS,
  LOAD_RESOURCE_FAIL
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

/** Load Resources for caching **/

/**
 * @param {String[]} uuids - uuids of activities that have resoruces
 * @param [String[]] resorces - url of resources
 */
export function loadResource (uuids, resourceUrls) {
  return {
    type: LOAD_RESOURCE_START,
    uuids,
    resourceUrls
  }
}

/**
 * @param {String[]} uuids - uuids of activities that have resoruces
 */
export function loadResourceSuccess (uuids) {
  return {
    type: LOAD_RESOURCE_SUCCESS,
    uuids
  }
}

/**
 */
export function loadResourceFail () {
  return {
    type: LOAD_RESOURCE_FAIL,
  }
}
