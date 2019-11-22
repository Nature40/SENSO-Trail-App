import { mergeMap, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray } from '../utils/transforms/entityArray.transforms.js'

import {
  LOAD_STATION_START,
  LOAD_STATION_SUCCESS,
  LOAD_STATION_FAIL,
  COMPLETE_STATION_START
} from '../constants/station.constants.js'

import { getActivity } from '../selectors/activity.selectors.js'

import { completeStationFail, completeStationSuccess } from '../actions/station.action.js'

export function loadStationsEpic (action$, state$, { fetchJSON }) {
  return action$.pipe(
    ofType(LOAD_STATION_START),
    mergeMap(async action => {
      const url = process.env.PUBLIC_URL + '/json/stationlist.json'
      const result = await fetchJSON(url, { uuids: action.uuids })
      return {
        type: LOAD_STATION_SUCCESS,
        transformedStations: normalizeEntityArray(result)
      }
    }),
    catchError((e) => {
      return of({
        type: LOAD_STATION_FAIL
      })
    })
  )
}

export function completeStationEpic (action$, state$) {
  return action$.pipe(
    ofType(COMPLETE_STATION_START),
    switchMap((action) => {
      const station = state$.value.station.byUuid[action.uuid]
      const activityUuids = station.activities
      const isCompleted = activityUuids
        .map((uuid) => getActivity(state$.value, { uuid }))
        .reduce((isCompleted, activity) => isCompleted && activity.completed)
      if (isCompleted) {
        return of(completeStationSuccess(action.uuid))
      }
      return of(completeStationFail(action.uuid))
    })
  )
}

export default combineEpics(
  loadStationsEpic,
  completeStationEpic
)
