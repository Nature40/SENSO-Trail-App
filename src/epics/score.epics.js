import { map, switchMap } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import uuidv1 from 'uuid/v1'

import {
  START_TRAIL_SUCCESS
} from '../constants/trails.constants.js'

import {
  ADD_POINTS
} from '../constants/score.constants.js'

import {
  resetScore,
  addPoints
} from '../actions/score.actions.js'

import {
  MESSAGE_TYPE_LOG
} from '../constants/messages.constatns.js'

import {
  COMPLETE_ACTIVITY
} from '../constants/activity.constants.js'

import { addMessage } from '../actions/messages.actions.js'

export function resetScoreEpic (action$) {
  return action$.pipe(
    ofType(START_TRAIL_SUCCESS),
    map(action => resetScore())
  )
}

export function addPointsEpic (action$) {
  return action$.pipe(
    ofType(COMPLETE_ACTIVITY),
    switchMap(action => {
      if (action.points && action.points > 0) {
        return of(addPoints(action.points))
      }
      return EMPTY
    })
  )
}

// Maybe move this to message epics?!
export function scoreMessageEpic (action$) {
  return action$.pipe(
    ofType(ADD_POINTS),
    map(action => {
      const text = `+${action.points} Punkte`
      const uuid = uuidv1()
      return addMessage(
        MESSAGE_TYPE_LOG,
        text,
        uuid
      )
    }
    )
  )
}

export default combineEpics(
  resetScoreEpic,
  scoreMessageEpic,
  addPointsEpic
)
