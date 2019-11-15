import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import trails, { initialState as trailsState } from './trails.reducer.js'
import station, { initialState as stationState } from './station.reducer.js'

export const initialState = {
  trails: trailsState,
  station: stationsState
}

export default function createRootReducer (history) {
  return combineReducers({
    router: connectRouter(history),
    trails,
    station
    /* Other reducers */
  })
}
