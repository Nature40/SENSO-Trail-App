import { combineEpics, createEpicMiddleware } from 'redux-observable'
import trailsEpics from './trails.epics.js'
import stationEpics from './station.epics.js'
import activityEpics from './activity.epics.js'
import mulitChoiceActivityEpics from './multiChoiceActivity.epics.js'
import ImageActivityEpics from './imageActivity.epic.js'
import messageEpics from './message.epic.js'

/* DEPENDENCIES */
import { fetchJSON, getResources } from '../utils/api.js'

const rootEpic = combineEpics(
  trailsEpics,
  stationEpics,
  activityEpics,
  ImageActivityEpics,
  mulitChoiceActivityEpics,
  messageEpics
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON,
    getResources
  }
})

export default rootEpic
