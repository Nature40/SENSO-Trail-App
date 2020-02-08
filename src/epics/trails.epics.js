import { take, mergeMap, catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray } from '../utils/transforms/entityArray.transforms.js'

import {
  LOAD_TRAILS_START,
  LOAD_TRAILS_SUCCESS,
  LOAD_TRAILS_FAIL,
  START_TRAIL_BEGIN,
  START_TRAIL_SUCCESS,
  START_TRAIL_REJECT
} from '../constants/trails.constants.js'

import {
  MESSAGE_TYPE_ERROR
} from '../constants/messages.constatns.js'

import { addMessage } from '../actions/messages.actions.js'

import { loadStations } from '../actions/station.action.js'

import { LOAD_ACTIVITIES_SUCCESS } from '../constants/activity.constants.js'

import { getCurrentTrail } from '../selectors/trails.selectors.js'

import { push } from 'connected-react-router'

export const loadTrailsEpic = (action$, state$, { fetchJSON }) => action$.pipe(
  ofType(LOAD_TRAILS_START),
  mergeMap(async action => {
    const url = process.env.PUBLIC_URL + '/json/trailslist.json'
    const result = await fetchJSON(url)
    return {
      type: LOAD_TRAILS_SUCCESS,
      transformedTrails: normalizeEntityArray(result)
    }
  }),
  catchError((e) => {
    return [
      {
        type: LOAD_TRAILS_FAIL
      },
      addMessage(MESSAGE_TYPE_ERROR, "Die Trails konnten leider nicht geladen werden.")
    ]
  })
)

export const startTrailEpic = (action$, state$, dep) => action$.pipe(
  ofType(START_TRAIL_BEGIN),
  map(action => {
    if (state$.value.trails.current_trail !== undefined) {
      return {
        type: START_TRAIL_REJECT,
        trailId: action.trailId
      }
    }
    return {
      type: START_TRAIL_SUCCESS,
      trailId: action.trailId
    }
  })
  /* ,
   catchError((e) => {
    console.error(e)
    return of({
      type: LOAD_TRAILS_FAIL,
    })
  }) */
)

export const gotoCurrentStartedTrail = (action$, state$, dep) => action$.pipe(
  ofType(START_TRAIL_SUCCESS),
  mergeMap(action => action$.pipe(
    ofType(LOAD_ACTIVITIES_SUCCESS),
    map(action => {
      return push('/mytrail')
    }),
    take(1)
  ))
)

export const startTrailSuccessEpic = (action$, state$, dep) => action$.pipe(
  ofType(START_TRAIL_SUCCESS),
  mergeMap((action) => {
    const currentTrail = getCurrentTrail(state$.value)
    return [loadStations(currentTrail.stations)]
  })
)

export default combineEpics(
  startTrailEpic,
  loadTrailsEpic,
  startTrailSuccessEpic,
  gotoCurrentStartedTrail
)
