import { createSelector } from 'reselect'

export function selectStations(state) {
    console.log(state.resources.stations)
  try{
    return Object.values(state.resources.stations)
  } catch {
    return []
  } 
}

/**
 * @param {State} state
 * @return Object[]?
 */
export const getStations = createSelector(
  [selectStations],
  (stations) => stations )
