import { ofType, combineEpics } from 'redux-observable'
import { of, EMPTY } from 'rxjs'
import { switchMap, catchError, delay } from 'rxjs/operators'

import { tagDataToStation } from '../utils/transforms/tagsToStations.js'

import {
  CHOOSE_CHAT_OPTION,
  LOAD_INK_JSON_START,
  LOAD_INK_JSON_SUCCESS,
  ADD_CHAT_MESSAGE,
  SENDER_IS_PLAYER,
  SENDER_IS_SENSI,
  JUMP_TO_SCENE
} from '../constants/chat.constants.js'

import {
  addChatMessage,
  loadInkJsonSuccess,
  loadInkJsonFail,
  setChatOptions,
  chooseChatOption,
} from '../actions/chat.actions.js'

import {
  addResource
} from '../actions/resources.actions.js'

import {
  RESOURCE_TYPE_STATION
} from '../constants/resources.constants.js'
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

export function getJumpToScene(action$, state$, { getCurrentStory }) {
  return action$.pipe(
    ofType(JUMP_TO_SCENE),
    switchMap(action => {
      const story = getCurrentStory()
      if(!story){
        return EMPTY
      }
      story.ChoosePathString(action.sceneId)

      return [chooseChatOption(-1)]

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

export function loadInkJsonEpic (action$, state$, { fetchJSON, initStory}) {
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

export function startStoryEpic (action$, state$, { getCurrentStory, getGlobalTags }) {
  return action$.pipe(
    ofType(LOAD_INK_JSON_SUCCESS),
    switchMap(action => {
      const story = getCurrentStory()
      const globalTags = getGlobalTags(story.globalTags)
      console.log("globalTags:", globalTags)

      const stations = tagDataToStation(globalTags.stations)

      return [addResource(stations, RESOURCE_TYPE_STATION),chooseChatOption(-1)]
    })
  )
}


export default combineEpics(
  sendChatMessage,
  loadInkJsonEpic,
  getNextOptionOrContinue,
  startStoryEpic,
  getJumpToScene
)
