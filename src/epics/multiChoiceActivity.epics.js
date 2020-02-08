import { switchMap } from 'rxjs/operators'
import { EMPTY } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'

import {
  CHOOSE_ANSWER
} from '../constants/multiChoiceActivity.constants.js'

import { revealAnswers } from '../actions/multiChoiceActivity.action.js'
import { completeActivity } from '../actions/activity.action.js'

export function revealAnswersEpic (action$, state$) {
  return action$.pipe(
    ofType(CHOOSE_ANSWER),
    switchMap((action) => {
      const activity = state$.value.activity.byUuid[action.uuid]
      const answers = Object.values(activity.answers)
      const answersLeft = answers.filter((a) => !a.choosen && a.id !== action.answerId)

      const correctNotChoose = answersLeft.filter((a) => a.correct)
      const wrongNotChoose = answersLeft.filter((a) => !a.correct)

      if (correctNotChoose.length < 1) {
        return [
          revealAnswers(action.uuid),
          completeActivity(action.uuid, activity.points)
        ]
      }
      if (wrongNotChoose.length < 1) {
        return [
          revealAnswers(action.uuid),
          completeActivity(action.uuid)
        ]
      }
      return EMPTY
    })
  )
}

export default combineEpics(
  revealAnswersEpic
)
