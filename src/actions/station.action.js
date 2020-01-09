import {
  LOAD_STATION_START,
  LOAD_STATION_SUCCESS,
  LOAD_STATION_FAIL,
  UNLOCK_STATION_START,
  UNLOCK_STATION_SUCCESS,
  UNLOCK_STATION_FAIL
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
 * @param {Object} transformedStations - loaded Stations
 */
export function loadStationsSuccess (transformedStations, slugToUuid) {
  return {
    type: LOAD_STATION_SUCCESS,
    transformedStations,
    slugToUuid
  }
}

/**
 */
export function loadStationsFail () {
  return {
    type: LOAD_STATION_FAIL,
  }
}

/**
 * @param {string} uuid - uuid of the Station to unlock
 */
export function unlockStationStart (uuid) {
  return {
    type: UNLOCK_STATION_START,
    uuid
  }
}


/**
 * @param {string} uuid - uuid of the Station to unlock
 */
export function unlockStationSuccess (uuid) {
  return {
    type: UNLOCK_STATION_SUCCESS,
    uuid
  }
}

/**
 * @param {string} uuid - uuid of the Station to unlock
 */
export function unlockStationFail (uuid) {
  return {
    type: UNLOCK_STATION_FAIL,
    uuid
  }
}

