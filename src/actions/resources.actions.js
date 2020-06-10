import {
  LOAD_RESOURCE_START,
  LOAD_RESOURCE_SUCCESS,
  LOAD_RESOURCE_FAIL,
  PRELOAD_CACHE_DATA,
  PRELOAD_CACHE_DATA_FINISED,
  PRELOAD_CACHE_DATA_FAIL,
  SET_SW_ACTIVE,
  ADD_RESOURCE
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
 * @param {Object} resources - loaded Resources
 * @param {String} resourceType - Type of resources
 */
export function loadResourcesSuccess (resource, resourceType = '') {
  return {
    type: LOAD_RESOURCE_SUCCESS,
    resource,
    resourceType
  }
}

/**
 */
export function loadResourcesFail () {
  return {
    type: LOAD_RESOURCE_FAIL,
  }
}

/**
 * @param {Object} resource - Resources to Add
 * @param {String} resourceType - Type of resources
 */
export function addResource(resource, resourceType) {
  return {
    type: ADD_RESOURCE,
    resource,
    resourceType
  }
}

/**
 * @param {string[]} urls 
 */
export function preloadCacheData(urls){
  return {
    type: PRELOAD_CACHE_DATA,
    urls
  }
}

/**
 * @param {string[]} urls 
 */
export function preloadCacheDataFinished(urls){
  return {
    type: PRELOAD_CACHE_DATA_FINISED,
    urls
  }
}
/**
 * @param {string[]} urls 
 */
export function preloadCacheDataFail(msg){
  return {
    type: PRELOAD_CACHE_DATA_FAIL,
    msg
  }
}

/**
 * @param {bool} active - default true 
 */
export function setSwActive(active = true){
  return {
    type: SET_SW_ACTIVE,
    active
  }
}
