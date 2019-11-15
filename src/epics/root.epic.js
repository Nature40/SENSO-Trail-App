import { combineEpics, createEpicMiddleware } from 'redux-observable'
import trailsEpics from './trails.epics.js'

/* DEPENDENCIES */
import { fetchJSON } from '../utils/api.js'

const rootEpic = combineEpics(
  trailsEpics
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON
  }
})

export default rootEpic
