import { map } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'

import {
  START_TRAIL_SUCCESS
} from '../constants/trails.constants.js'

import {
  resetScore
} from '../actions/score.actions.js'

export function resetScoreEpic (action$) {
  return action$.pipe(
    ofType(START_TRAIL_SUCCESS),
    map(action => resetScore())
  )
}

export default combineEpics(
  resetScore
)
