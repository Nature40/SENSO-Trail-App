import { map, switchMap, delay } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType, combineEpics } from 'redux-observable'
import uuidv1 from 'uuid/v1'

import {
  LOAD_RESOURCE_FAIL
} from '../constants/resources.constants.js'

import {
  LOAD_INK_JSON_FAIL
} from '../constants/chat.constants.js'

import {
  ADD_MESSAGE,
  MESSAGE_TYPE_ERROR,
  //MESSAGE_TYPE_LOG,
  //MESSAGE_TYPE_SUCCESS,
  MESSAGE_TIME_IN_SECONDS
} from '../constants/messages.constatns.js'

import { addMessage, hideMessage } from '../actions/messages.actions.js'

const messagesArray = [
  {
    trigger: LOAD_RESOURCE_FAIL,
    type: MESSAGE_TYPE_ERROR,
    message: 'Fehler: Resourcen konnten nicht gelanden werden'
  },
  {
    trigger: LOAD_INK_JSON_FAIL,
    type: MESSAGE_TYPE_ERROR,
    message: 'Fehler: Die Story konnte nicht gelanden werden'
  },
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
