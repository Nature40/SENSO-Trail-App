import {
  LOAD_STATION_START,
  COMPLETE_STATION_START,
  COMPLETE_STATION_SUCCESS,
  COMPLETE_STATION_FAIL
} from '../constants/station.constants.js'

/**
 * @param {Array<string>} uuids - Array of uuids of the stations that should be loaded
 */
export function loadStations (uuids) {
  return {
    type: LOAD_STATION_START,
    uuids
  }
}

/**
 * @param {string} uuid - uuid of the Station to complete
 */
export function completeStationStart (uuid) {
  return {
    type: COMPLETE_STATION_START,
    uuid
  }
}

/**
 * @param {string} uuid - uuid of the Station to complete
 */
export function completeStationSuccess (uuid) {
  return {
    type: COMPLETE_STATION_SUCCESS,
    uuid
  }
}

/**
 * @param {string} uuid - uuid of the Station to complete
 */
export function completeStationFail (uuid) {
  return {
    type: COMPLETE_STATION_FAIL,
    uuid
  }
}
