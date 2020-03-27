import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { map, switchMap, catchError, delay } from 'rxjs/operators'

import {
  CHOOSE_CHAT_OPTION,
  LOAD_INK_JSON_START,
  ADD_CHAT_MESSAGE,
  SENDER_IS_PLAYER,
  SENDER_IS_SENSI
} from '../constants/chat.constants.js'

import {
  addChatMessage,
  loadInkJsonSuccess,
  loadInkJsonFail,
  setChatOptions,
} from '../actions/chat.actions.js'

/**
 */
export function sendChatMessage (action$, state$, { getCurrentStory }) {
  return action$.pipe(
    ofType(CHOOSE_CHAT_OPTION),
    switchMap(action => {
      
      const story = getCurrentStory()

      if(action.option < 0){
        return of(addChatMessage(story.Continue(), SENDER_IS_SENSI))
      }

      if (story.currentChoices.length > 0) {
        story.ChooseChoiceIndex(action.option)
      }

      return of(addChatMessage(story.Continue(), SENDER_IS_PLAYER))
    })
  )
}

export function getNextOptionOrContinue (action$, state$, { getCurrentStory }) {
  return action$.pipe(
    ofType(ADD_CHAT_MESSAGE),
    switchMap(action => {
      const story = getCurrentStory()

      if (story.canContinue) {
        return of(addChatMessage(story.Continue(), SENDER_IS_SENSI)).pipe(
          delay(1000)
        )
      } else {
        if (story.currentChoices.length > 0) {
          const options = story.currentChoices.map(o => {
            return {
              text: o.text,
              index: o.index
            }
          })
          return of(setChatOptions(options))
        }
        return of(setChatOptions([]))
      }
    })
  )
}

export function loadInkJsonEpic (action$, state$, { fetchJSON, initStory }) {
  return action$.pipe(
    ofType(LOAD_INK_JSON_START),
    switchMap(async action => {
      const url = process.env.PUBLIC_URL + '/json/' + action.filename
      const result = await fetchJSON(url)
      initStory(result)
      return loadInkJsonSuccess(action.filename, result)
    }),
    catchError((e) => {
      return [
        loadInkJsonFail()
      ]
    })
  )
}


export default combineEpics(
  sendChatMessage,
  loadInkJsonEpic,
  getNextOptionOrContinue
)
