import {
  LOAD_STATION_START,
  LOAD_STATION_SUCCESS,
  LOAD_STATION_FAIL
} from '../constants/station.constants.js'

import { mergeMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray } from '../utils/transforms/entityArray.transforms.js'

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
      console.log(e)
      return of({
        type: LOAD_STATION_FAIL
      })
    })
  )
}

export default combineEpics(
  loadStationsEpic
)
