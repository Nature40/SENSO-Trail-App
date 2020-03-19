import { ofType, combineEpics } from 'redux-observable'
import { map, switchMap, catchError } from 'rxjs/operators'

import {
  CHOOSE_CHAT_OPTION,
  LOAD_INK_JSON_START
} from '../constants/chat.constants.js'

import {
  addChatMessage,
  loadInkJsonSuccess,
  loadInkJsonFail
} from '../actions/chat.actions.js'

/**
 */
export function sendChatMessage (action$, state$, { getCurrentStory }) {
  return action$.pipe(
    ofType(CHOOSE_CHAT_OPTION),
    switchMap(action => {
      const story = getCurrentStory()

      if(story.currentChoices.length > 0) {
        story.ChooseChoiceIndex(action.option)
      }

      const tobeadd = []
      while (story.canContinue) {
        tobeadd.push(story.Continue())
      }
      return tobeadd.map(text => addChatMessage(text, 'TEST'))
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
  loadInkJsonEpic
)
