import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { map, switchMap } from 'rxjs/operators'

import { loadInkJsonStart } from '../actions/chat.actions.js'

import isNearLocation from '../utils/geo/nearLocation.js'

import uuidv1 from 'uuid/v1'

import {
  GEOLOCATION_CHANGED,
  GEOLOCATION_ERROR
} from '../constants/geolocation.constants.js'

import {
  setCurrentSite
} from '../actions/geolocation.actions.js'

import {
  SENDER_IS_SENSI
} from '../constants/chat.constants.js'

import {
  addChatMessage,
  jumpToScene,
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

      const stations = state$.value.resources.stations
      const currentSite = state$.value.geolocation.currentSite
      for(let id in stations){
        if(id === currentSite.uuid){
          continue
        }
        if(isNearLocation(
          action.latitude,
          action.longitude,
          stations[id].latitude,
          stations[id].longitude
        )) {
          return [
            jumpToScene(stations[id].station),
            setCurrentSite(id, "stations")
          ]
        }
      }
      return EMPTY
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
