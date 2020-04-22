import { combineEpics, createEpicMiddleware } from 'redux-observable'
import trailsEpics from './trails.epics.js'
import stationEpics from './station.epics.js'
import activityEpics from './activity.epics.js'
import mulitChoiceActivityEpics from './multiChoiceActivity.epics.js'
import ImageActivityEpics from './imageActivity.epic.js'
import messageEpics from './message.epic.js'
import scoreEpic from './score.epics.js'
import chatEpic from './chat.epic.js'
import geolocationEpic from './geolocation.epic.js'

/* DEPENDENCIES */
import { fetchJSON, getResources } from '../utils/api.js'
import { getCurrentStory, initStory } from '../utils/inkjs/currentStory.js'

const rootEpic = combineEpics(
  trailsEpics,
  stationEpics,
  activityEpics,
  ImageActivityEpics,
  mulitChoiceActivityEpics,
  messageEpics,
  scoreEpic,
  chatEpic,
  geolocationEpic
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON,
    getResources,
    getCurrentStory,
    initStory
  }
})

export default rootEpic
