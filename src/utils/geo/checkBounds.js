/**
 * @param {double} latitude
 * @param {double} longitude
 * @return Boolean
 */
export function checkBounds(latitude, longitude) {
  return (
    latitude  >= mapBounds.latitude.min  &&
    latitude  <= mapBounds.latitude.max  &&
    longitude >= mapBounds.longitude.min &&
    longitude <= mapBounds.longitude.max 
  )
}

export const mapBounds = {
  latitude: {
    min: 50.82113813164011,
    max: 50.85731159369495,
  },
  longitude: {
    min:8.630602108424023,
    max:8.701868299964586
  }
}
