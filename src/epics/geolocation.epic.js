import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { map, switchMap, catchError, delay } from 'rxjs/operators'

import {
  GEOLOCATION_CHANGED
} from '../constants/geolocation.constants.js'

import {
  SENDER_IS_SENSI
} from '../constants/chat.constants.js'

import {
  addChatMessage,
} from '../actions/chat.actions.js'

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

export default combineEpics(
  changeLocationEpic
)
