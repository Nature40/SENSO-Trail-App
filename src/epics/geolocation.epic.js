import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { map, switchMap, catchError, delay } from 'rxjs/operators'

import uuidv1 from 'uuid/v1'

import {
  GEOLOCATION_CHANGED,
  GEOLOCATION_ERROR
} from '../constants/geolocation.constants.js'

import {
  SENDER_IS_SENSI
} from '../constants/chat.constants.js'

import {
  addChatMessage,
} from '../actions/chat.actions.js'

import {
  MESSAGE_TYPE_ERROR,
} from '../constants/messages.constatns.js'

import { addMessage } from '../actions/messages.actions.js'
/**
 */
export function changeLocationEpic(action$, state$ ) {
  return action$.pipe(
    ofType(GEOLOCATION_CHANGED),
    switchMap(action => {
      console.log(action)
      console.log("NEW LOCATION?")
      const message = `New Location: lat: ${action.latitude}, long: ${action.longitude}`
      let ret = addChatMessage(message, SENDER_IS_SENSI)
      console.log(ret)
      return of(ret)
    })
  )
}

/**
 */
export function locationErrorEpic(action$, state$ ) {
  return action$.pipe(
    ofType(GEOLOCATION_ERROR),
    switchMap(action => {
      console.log(action)
      console.log("GEOLOCATION_ERROR")
      const uuid = uuidv1()
      const message = `Geolocation Error. Code: ${action.error.code} msg: ${action.error.message}`
      return of(addMessage(MESSAGE_TYPE_ERROR, message, uuid))
    })
  )
}

export default combineEpics(
  changeLocationEpic,
  locationErrorEpic
)
