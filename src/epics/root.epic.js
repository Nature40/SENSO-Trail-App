import { combineEpics, createEpicMiddleware } from 'redux-observable'
import trailsEpics from './trails.epics.js'
import stationEpics from './station.epics.js'
import activityEpics from './activity.epics.js'
import mulitChoiceActivityEpics from './multiChoiceActivity.epics.js'
import textActivityEpics from './textActivity.epics.js'

/* DEPENDENCIES */
import { fetchJSON } from '../utils/api.js'

const rootEpic = combineEpics(
  trailsEpics,
  stationEpics,
  activityEpics,
  mulitChoiceActivityEpics,
  textActivityEpics
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON
  }
})

export default rootEpic
