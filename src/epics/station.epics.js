import { mergeMap, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray, getSlugsEntityArray } from '../utils/transforms/entityArray.transforms.js'

import {
  LOAD_STATION_START,
  UNLOCK_STATION_START
} from '../constants/station.constants.js'

import { getCurrentTrail } from '../selectors/trails.selectors.js'
import { getStation } from '../selectors/station.selectors.js'
import { getActivity } from '../selectors/activity.selectors.js'
import { getStationUnlockable } from '../selectors/path.selectors.js'

import {
  loadStationsSuccess,
  loadStationsFail,
  unlockStationFail,
  unlockStationSuccess
} from '../actions/station.action.js'

import { selectNextStation } from '../actions/trails.action.js'

export function loadStationsEpic (action$, state$, { fetchJSON }) {
  return action$.pipe(
    ofType(LOAD_STATION_START),
    mergeMap(async action => {
      const url = process.env.PUBLIC_URL + '/json/stationlist.json'
      const result = await fetchJSON(url, { uuids: action.uuids })
      return loadStationsSuccess(normalizeEntityArray(result), getSlugsEntityArray(result))
    }),
    catchError((e) => {
      return of(loadStationsFail())
    })
  )
}

export function unlockStationEpic (action$, state$) {
  return action$.pipe(
    ofType(UNLOCK_STATION_START),
    switchMap((action) => {
      //const station = state$.value.station.byUuid[action.uuid]
      /*
      const currentTrail = getCurrentTrail(state$.value)
      const unlockIdx = currentTrail.stations.indexOf(action.uuid)
      console.log("START UNLOCKING TEST")

      let unlockable = currentTrail.stations
        .filter((val, idx) => idx < unlockIdx)
        .map(
          (uuid) => getStation(state$.value, {uuid}).activities.map(
            (aUuid) => (getActivity(state$.value, {uuid: aUuid}).completed || false)
          )
        ).flat()
      console.log("ARRAY: ", unlockable)
      unlockable = unlockable.reduce((acc, cur) => acc && cur, true)

      console.log("IS UNLOCKABLE: ", unlockable)
      */
      if (getStationUnlockable(state$.value, {uuid: action.uuid})) {
        console.log("UNLOCK STAION:", getStation(state$.value, {uuid: action.uuid}))
        return [unlockStationSuccess(action.uuid), selectNextStation()]
      }

      console.log("DONT UNLOCK STAION:", getStation(state$.value, {uuid: action.uuid}))
      return of(unlockStationFail(action.uuid))
    })
  )
}

export default combineEpics(
  loadStationsEpic,
  unlockStationEpic
)
