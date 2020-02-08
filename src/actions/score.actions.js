import {
  ADD_POINTS,
  RESET_SCORE
} from '../constants/score.constants.js'

export function addPoints (points) {
  return {
    type: ADD_POINTS,
    points
  }
}

export function resetScore () {
  return {
    type: RESET_SCORE
  }
}
