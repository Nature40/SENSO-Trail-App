import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { loadTrailsEpic, startTrailEpic } from './trails.epics.js'

/* DEPENDENCIES */
import { fetchJSON } from '../utils/api.js'

const rootEpic = combineEpics(
  loadTrailsEpic,
  startTrailEpic
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON
  }
})

export default rootEpic
