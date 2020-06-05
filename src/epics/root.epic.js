import { combineEpics, createEpicMiddleware } from 'redux-observable'
import messageEpics from './message.epic.js'
import chatEpic from './chat.epic.js'
import geolocationEpic from './geolocation.epic.js'
import resourceEpic from './resources.epics.js'

/* DEPENDENCIES */
import { fetchJSON } from '../utils/api.js'
import { getCurrentStory, initStory } from '../utils/inkjs/currentStory.js'
import { extractTags, getGlobalTags } from '../utils/inkjs/extractTags.js'

const rootEpic = combineEpics(
  messageEpics,
  chatEpic,
  geolocationEpic,
  resourceEpic
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON,
    fetch: window.fetch,
    getCurrentStory,
    initStory,
    extractTags,
    getGlobalTags
  }
})

export default rootEpic
