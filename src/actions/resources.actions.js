import {
  LOAD_RESOURCE_START,
  LOAD_RESOURCE_SUCCESS,
  LOAD_RESOURCE_FAIL,
} from '../constants/resources.constants.js'

/**
 * @param {string} source - resource name
 */
export function loadResource (source) {
  return {
    type: LOAD_RESOURCE_START,
    source
  }
}

/**
 * @param {Object} transformedResources - loaded Resources
 */
export function loadResourcesSuccess (transformedResources) {
  return {
    type: LOAD_RESOURCE_SUCCESS,
    transformedResources,
  }
}

/**
 */
export function loadResourcesFail () {
  return {
    type: LOAD_RESOURCE_FAIL,
  }
}
