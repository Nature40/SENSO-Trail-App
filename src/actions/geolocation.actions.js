import { GEOLOCATION_CHANGED, GEOLOCATION_ERROR } from '../constants/geolocation.constants.js'

/**
 * @param {double} latitude 
 * @param {double} longitude 
 * @return {Object}
 */
export function changeLocation(latitude, longitude){
  return {
    type: GEOLOCATION_CHANGED,
    latitude,
    longitude
  }
}

/**
 * @param {String} err
 * @return {Object}
 */
export function locationError(error){
  //console.error(error)
  return {
    type: GEOLOCATION_ERROR,
    error
  }
}
