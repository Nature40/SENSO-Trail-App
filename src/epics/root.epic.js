import { combineEpics, createEpicMiddleware } from 'redux-observable'
import { loadTrailsEpic } from './trails.epics.js'

/* DEPENDENCIES */
import { fetchJSON } from '../utils/api.js'

const rootEpic = combineEpics(
  loadTrailsEpic
)

export const configureEpicMiddleware = () => createEpicMiddleware({
  dependencies: {
    fetchJSON
  }
})

export default rootEpic
