import { switchMap } from 'rxjs/operators'
import { of, EMPTY } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'

import {
  CHOOSE_ANSWER
} from '../constants/multiChoiceActivity.constants.js'

import { revealAnswers } from '../actions/multiChoiceActivity.action.js'

export function revealAnswersEpic (action$, state$) {
  return action$.pipe(
    ofType(CHOOSE_ANSWER),
    switchMap((action) => {
      let answers = Object.values(state$.value.activity.byUuid[action.uuid].answers)
      answers = answers.filter((a) => !a.choosen && a.id !== action.answerId)
      const correctNotChoose = answers.filter((a) => a.correct)
      if (correctNotChoose.length < 1) {
        return of(revealAnswers(action.uuid))
      }
      const wrongNotChoose = answers.filter((a) => !a.correct)
      console.log(wrongNotChoose)
      if (wrongNotChoose.length < 2) {
        return of(revealAnswers(action.uuid))
      }
      return EMPTY
    })
  )
}

export default combineEpics(
  revealAnswersEpic
)
