import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import trails, { initialState as trailsState } from './trails.reducer.js'
import station, { initialState as stationState } from './station.reducer.js'
import activity, { initialState as activityState } from './activity.reducer.js'
import messages, { initialState as messagesState } from './messages.reducer.js'

export const initialState = {
  trails: trailsState,
  station: stationState,
  activity: activityState,
  messages: messagesState
}

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    trails,
    station,
    activity,
    messages
    /* Other reducers */
  })
}
