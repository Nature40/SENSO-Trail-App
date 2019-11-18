import {
  LOAD_ACTIVITIES_START,
  LOAD_ACTIVITIES_FAIL
} from '../constants/activity.constants.js'

import {
  LOAD_STATION_SUCCESS
} from '../constants/station.constants.js'

import {
  loadActivitySuccess,
  loadActivity
} from '../actions/activity.action.js'

import { mergeMap, catchError, map } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray } from '../utils/transforms/entityArray.transforms.js'

export function loadActivitiesEpic (action$, state$, { fetchJSON }) {
  return action$.pipe(
    ofType(LOAD_ACTIVITIES_START),
    mergeMap(async action => {
      const url = process.env.PUBLIC_URL + '/json/activities.json'
      const result = await fetchJSON(url, { uuids: action.uuids })
      return loadActivitySuccess(normalizeEntityArray(result))
    }),
    catchError((e) => {
      return of({
        type: LOAD_ACTIVITIES_FAIL
      })
    })
  )
}

export function startLoadActivitiesEpic (action$, state$, dep) {
  return action$.pipe(
    ofType(LOAD_STATION_SUCCESS),
    map(action => {
      const toLoadArray = Object.values(action.transformedStations)
        .map((v) => v.activities)
      const uuids = []
      toLoadArray.forEach(e => uuids.push(...e))
      return loadActivity(uuids)
    })
  )
}

export default combineEpics(
  loadActivitiesEpic,
  startLoadActivitiesEpic
)