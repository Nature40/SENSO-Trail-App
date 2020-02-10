import { map, switchMap, delay } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import uuidv1 from 'uuid/v1'

import {
  LOAD_STATION_FAIL,
  UNLOCK_STATION_FAIL,
  UNLOCK_STATION_SUCCESS
} from '../constants/station.constants.js'

import {
  LOAD_TRAILS_FAIL
} from '../constants/trails.constants.js'

import {
  ADD_MESSAGE,
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_LOG,
  MESSAGE_TYPE_SUCCESS,
  MESSAGE_TIME_IN_SECONDS
} from '../constants/messages.constatns.js'

import { addMessage, hideMessage } from '../actions/messages.actions.js'

const messagesArray = [
  {
    trigger: LOAD_STATION_FAIL,
    type: MESSAGE_TYPE_ERROR,
    message: 'Fehler: Die Stadtionen konnten nicht geladen werden'
  },
  {
    trigger: UNLOCK_STATION_FAIL,
    type: MESSAGE_TYPE_ERROR,
    message: 'Diese Stadtion kann noch nich freigeschaltet werden'
  },
  {
    trigger: UNLOCK_STATION_SUCCESS,
    type: MESSAGE_TYPE_SUCCESS,
    message: 'Station erfolgreich freigeschaltet'
  },
  {
    trigger: LOAD_TRAILS_FAIL,
    type: MESSAGE_TYPE_ERROR,
    message: 'Fehler: Die Trails konnten nicht geladen werden.'
  }
]

export function genEpic (messageSpec, genUuid = uuidv1) {
  return (action$, state$) => action$.pipe(
    ofType(messageSpec.trigger),
    map((action) => {
      const uuid = genUuid()
      return addMessage(messageSpec.type, messageSpec.message, uuid)
    })
  )
}

export function hideMessageEpic (action$) {
  return action$.pipe(
    ofType(ADD_MESSAGE),
    switchMap(action => {
      return of(hideMessage(action.uuid)).pipe(
        delay(MESSAGE_TIME_IN_SECONDS * 1000)
      )
    })
  )
}

export default combineEpics(hideMessageEpic, ...messagesArray.map(mS => genEpic(mS)))
