import { map } from 'rxjs/operators'
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
  MESSAGE_TYPE_ERROR,
  MESSAGE_TYPE_LOG
} from '../constants/messages.constatns.js'

import { addMessage } from '../actions/messages.actions.js'

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
    type: MESSAGE_TYPE_LOG,
    message: 'Station erfolgreich freigeschaltet'
  },
  {
    trigger: LOAD_TRAILS_FAIL,
    type: MESSAGE_TYPE_ERROR,
    message: 'Fehler: Die Trails konnten nicht geladen werden.'
  }
]

export function genEpic(messageSpec, genUuid = uuidv1) {
  return (action$, state$) => action$.pipe(
    ofType(messageSpec.trigger),
    map((action) => {
      const uuid = genUuid()
      return addMessage(messageSpec.type, messageSpec.message, uuid)
    })
  )
}

export default combineEpics(...messagesArray.map(mS => genEpic(mS)))
