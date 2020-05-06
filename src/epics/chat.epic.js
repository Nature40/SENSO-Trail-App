import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { map, switchMap, mergeMap, catchError, delay } from 'rxjs/operators'

import {
  CHOOSE_CHAT_OPTION,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  ADD_CHAT_MESSAGE,
  SENDER_IS_PLAYER,
  SENDER_IS_SENSI
} from '../constants/chat.constants.js'

import {
  addChatMessage,
  loadInkJsonSuccess,
  loadInkJsonFail,
  setChatOptions,
  chooseChatOption,
} from '../actions/chat.actions.js'

/**
 */
export function sendChatMessage (action$, state$, { getCurrentStory, extractTags }) {
  return action$.pipe(
    ofType(CHOOSE_CHAT_OPTION),
    switchMap(action => {
      
      const story = getCurrentStory()

      if(action.option < 0){
        const message = story.Continue()
        const tags = extractTags(story.currentTags)
        return of(addChatMessage(message, SENDER_IS_SENSI, tags))
      }

      if (story.currentChoices.length > 0) {
        story.ChooseChoiceIndex(action.option)
      }

      return of(addChatMessage(story.Continue(), SENDER_IS_PLAYER))
    })
  )
}

export function getNextOptionOrContinue (action$, state$, { getCurrentStory, extractTags }) {
  return action$.pipe(
    ofType(ADD_CHAT_MESSAGE),
    switchMap(action => {
      const story = getCurrentStory()
      if(!story){
        return EMPTY
      }

      if (story.canContinue) {

        const message = story.Continue()
        const tags = extractTags(story.currentTags)
        return of(addChatMessage(message, SENDER_IS_SENSI, tags)).pipe(
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
      console.log("story loaded: ", action.filename)
      return loadInkJsonSuccess(action.filename, result) 
    }),
    catchError((e) => {
      return [
        loadInkJsonFail()
      ]
    })
  )
}

export function startStoryEpic (action$, state$, { fetchJSON, initStory }) {
  return action$.pipe(
    ofType(LOAD_INK_JSON_SUCCESS),
    switchMap(action => {
      return [chooseChatOption(-1)]
    })
  )
}


export default combineEpics(
  sendChatMessage,
  loadInkJsonEpic,
  getNextOptionOrContinue,
  startStoryEpic
)
