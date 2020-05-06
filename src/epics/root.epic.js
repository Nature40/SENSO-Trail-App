import { combineEpics, createEpicMiddleware } from 'redux-observable'
import messageEpics from './message.epic.js'
import chatEpic from './chat.epic.js'
import geolocationEpic from './geolocation.epic.js'
import resourceEpic from './resources.epics.js'

/* DEPENDENCIES */
import { fetchJSON, getResources } from '../utils/api.js'
import { getCurrentStory, initStory } from '../utils/inkjs/currentStory.js'
import { extractTags } from '../utils/inkjs/extractTags.js'

const rootEpic = combineEpics(
  messageEpics,
  chatEpic,
  geolocationEpic,
  resourceEpic
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON,
    getCurrentStory,
    initStory,
    extractTags
  }
})

export default rootEpic
