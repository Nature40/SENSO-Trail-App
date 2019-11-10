import {
  LOAD_TRAILS_START,
  START_TRAIL_BEGIN
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
