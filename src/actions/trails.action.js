import {
  LOAD_TRAILS_START,
  START_TRAIL_BEGIN,
  START_TRAIL_CANCEL,
  START_TRAIL_SUCCESS,
} from '../constants/trails.constants.js'

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
