import { switchMap } from 'rxjs/operators'
import { of, EMPTY } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'

import { OPEN_TEXT } from '../constants/textActivity.constants.js'

import { completeActivity } from '../actions/activity.action.js'

export function completeTextActivityEpic (action$, state$) {
  return action$.pipe(
    ofType(OPEN_TEXT),
    switchMap((action) => {
      if (!state$.value.activity.byUuid[action.uuid].completed) {
        return of(completeActivity(action.uuid))
      }
      return EMPTY
    })
  )
}

export default combineEpics(
  completeTextActivityEpic
)
