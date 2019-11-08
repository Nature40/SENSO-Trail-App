import {
  LOAD_TRAILS_START
} from '../constants/trails.constants.js'

export function loadTrails () {
  return {
    type: LOAD_TRAILS_START
  }
}
