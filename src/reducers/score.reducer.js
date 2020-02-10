import {
  ADD_POINTS,
  RESET_SCORE
} from '../constants/score.constants.js'

export const initialState = {
  score: 0
}

export default function score (state = initialState, action) {
  switch (action.type) {
    case ADD_POINTS:
      return {
        ...state,
        score: state.score + action.points
      }
    case RESET_SCORE:
      return {
        ...state,
        score: 0
      }
    default:
      return state
  }
}
