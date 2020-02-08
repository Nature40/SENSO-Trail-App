import { mergeMap, catchError, switchMap } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray, getSlugsEntityArray } from '../utils/transforms/entityArray.transforms.js'

import {
  LOAD_STATION_START,
  UNLOCK_STATION_START
} from '../constants/station.constants.js'

import { getStationUnlockable } from '../selectors/path.selectors.js'

import {
  loadStationsSuccess,
  loadStationsFail,
  unlockStationFail,
  unlockStationSuccess
} from '../actions/station.action.js'

import {
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_LOG
} from '../constants/messages.constatns.js'

import { addMessage } from '../actions/messages.actions.js'

export function loadStationsEpic (action$, state$, { fetchJSON }) {
  return action$.pipe(
    ofType(LOAD_STATION_START),
    mergeMap(async action => {
      const url = process.env.PUBLIC_URL + '/json/stationlist.json'
      const result = await fetchJSON(url, { uuids: action.uuids })
      return loadStationsSuccess(normalizeEntityArray(result), getSlugsEntityArray(result))
    }),
    catchError((e) => {
      return [
        loadStationsFail(),
        addMessage(MESSAGE_TYPE_ERROR, 'Die Stadtionen konnten nicht geladen werden')
      ]
    })
  )
}

export function unlockStationEpic (action$, state$) {
  return action$.pipe(
    ofType(UNLOCK_STATION_START),
    switchMap((action) => {
      if (getStationUnlockable(state$.value, {uuid: action.uuid})) {
        return [
          unlockStationSuccess(action.uuid),
          addMessage(MESSAGE_TYPE_LOG, "Station freigeschaltet!")
        ]
      }
      return [
        unlockStationFail(action.uuid),
        addMessage(MESSAGE_TYPE_ERROR, "Diese Stadtion kann noch nich freigeschaltet werden")
      ]
    })
  )
}

export default combineEpics(
  loadStationsEpic,
  unlockStationEpic
)
