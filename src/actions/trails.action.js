import {
  LOAD_TRAILS_START,
  START_TRAIL_BEGIN,
  START_TRAIL_CANCEL,
  START_TRAIL_SUCCESS,
  SELECT_NEXT_STATION
} from '../constants/trails.constants.js'

/**
 *
 */
export function selectNextStation () {
  return {
    type: SELECT_NEXT_STATION
  }
}

export function loadTrails () {
  return {
    type: LOAD_TRAILS_START
  }
}

export function startTrail (trailId) {
  return {
    type: START_TRAIL_BEGIN,
    trailId
  }
}

export function cancelStartTrail () {
  return {
    type: START_TRAIL_CANCEL
  }
}

export function acceptStartTrail (trailId) {
  return {
    type: START_TRAIL_SUCCESS,
    trailId
  }
}
