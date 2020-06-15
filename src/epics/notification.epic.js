import { switchMap, filter, catchError, map } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'

import {
  EMIT_NOTIFICATION
} from '../constants/notification.constants.js'

import {
  ADD_CHAT_MESSAGE,
  SENDER_IS_PLAYER
} from '../constants/chat.constants.js'

import {
  emitNotification
} from '../actions/notification.actions.js'

import {
  getNotificationPermission,
} from '../selectors/notification.selector.js'


export function emitNotificationEpic (action$, state$, { notify, logError }) {
  return action$.pipe(
    ofType(EMIT_NOTIFICATION),
    filter(() => {
      const allowed = getNotificationPermission(state$.value)

      return allowed

    }),
    switchMap(action => {
      notify(action.message)
      return []
    }),
    catchError((e) => {
      logError('[ERROR]: ', e)
      return []
    })
  )
}

const notificationEmitter = [
  {
    trigger: ADD_CHAT_MESSAGE,
    format: (action) => `${action.sender}: ${action.message}`,
    filterNotifications: (action, state) => {
      return state.router.location.pathname !== '/chat' && action.sender !== SENDER_IS_PLAYER
    }
  }
]
function genEpic ( {trigger, format, filterNotifications} ) {
  return (action$, state$) => action$.pipe(
    ofType(trigger),
    filter((action) => filterNotifications(action, state$.value)),
    map((action) => {
      return emitNotification(format(action))
    })
  ) 
}


export default combineEpics(
  emitNotificationEpic,
  ...notificationEmitter.map(genEpic)
)
