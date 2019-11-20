import {
  CHOOSE_ANSWER,
  REVEAL_ANSWERS
} from '../constants/multiChoiceActivity.constants.js'

export const initialState = {
  byUuid: {}
}

export default function multiChoiceActivityCase (state = initialState, action) {
  switch (action.type) {
    case CHOOSE_ANSWER:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            answers: {
              ...state.byUuid[action.uuid].answers,
              [action.answerId]: {
                ...state.byUuid[action.uuid].answers[action.answerId],
                choosen: true
              }
            }
          }
        }
      }
    case REVEAL_ANSWERS:
      return {
        ...state,
        byUuid: {
          ...state.byUuid,
          [action.uuid]: {
            ...state.byUuid[action.uuid],
            reveal: true
          }
        }
      }
    default:
      return state
  }
}
