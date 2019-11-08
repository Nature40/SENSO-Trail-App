import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import trails, { initialState as trailsState } from './trails.reducer.js'

export const initialState = {
  trails: trailsState
}

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    trails: trails
    /* Other reducers */
  })
}
