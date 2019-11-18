import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import trails, { initialState as trailsState } from './trails.reducer.js'
import station, { initialState as stationState } from './station.reducer.js'
import activity, { initialState as activityState } from './activity.reducer.js'

export const initialState = {
  trails: trailsState,
  station: stationState,
  activity: activityState
}

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    trails,
    station,
    activity
    /* Other reducers */
  })
}
