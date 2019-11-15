import {
  LOAD_STATION_START
} from '../constants/station.constants.js'

/**
 * @param {Array<string>} Uuids an Array of uuids of the stations that should be loaded
 */
export function loadStations (uuids) {
  return {
    type: LOAD_STATION_START,
    uuids
  }
}
