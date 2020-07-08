import { createSelector } from 'reselect'

export function selectCurrentLocation(state) {
  return state.geolocation.currentLocation
}

/**
 * @param {State} state
 * @return string?
 */
export const getCurrentLatitude = createSelector(
  [selectCurrentLocation],
  (currentLocation) => currentLocation.latitude )

/**
 * @param {State} state
 * @return string?
 */
export const getCurrentLongitude = createSelector(
  [selectCurrentLocation],
  (currentLocation) => currentLocation.longitude )

/**
 * @param {State} state
 * @return string[]
 */
export const getCurrentPosition = createSelector(
  [selectCurrentLocation],
  (currentLocation) => {
    return {
      lat: currentLocation.latitude,
      long: currentLocation.longitude 
    }
  }
)

