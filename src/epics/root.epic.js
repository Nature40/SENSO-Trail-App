import { combineEpics, createEpicMiddleware } from 'redux-observable'
import messageEpics from './message.epic.js'
import chatEpic from './chat.epic.js'
import geolocationEpic from './geolocation.epic.js'
import resourceEpic from './resources.epics.js'
import notificationEpic from './notification.epic.js'

/* DEPENDENCIES */
import { fetchJSON } from '../utils/api.js'
import { getCurrentStory, initStory } from '../utils/inkjs/currentStory.js'
import { extractTags, getGlobalTags } from '../utils/inkjs/extractTags.js'
import notify from '../utils/notification/notify.js'

const rootEpic = combineEpics(
  messageEpics,
  chatEpic,
  geolocationEpic,
  resourceEpic,
  notificationEpic
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON,
    fetch: window.fetch,
    getCurrentStory,
    initStory,
    extractTags,
    getGlobalTags,
    logError: (e) => console.error(e),
    notify
  }
})

export default rootEpic
