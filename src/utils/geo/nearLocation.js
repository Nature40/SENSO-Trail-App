/**
 * @param {double} xLatitude
 * @param {double} xLongitude
 * @param {double} locLatitude
 * @param {double} locLongitude
 * @param {number} range
 */

export default function isNearLocation(xLatitude, xLongitude, locLatitude, locLongitude, range = 10){
  return geoDistance(xLatitude, xLongitude, locLatitude, locLongitude) < range;
}

const EARTH_RAD_R = 6371009 //Earth Radius in meter

/**
 * @param {double} lat_1
 * @param {double} long_1
 * @param {double} lat_2
 * @param {double} long_2
 * return {double}
 */
export function geoDistance(lat_1, long_1, lat_2, long_2)
{
  lat_1 = degToRad(lat_1)
  long_1 = degToRad(long_1)
  lat_2 = degToRad(lat_2)
  long_2 = degToRad(long_2)
  const deltaLat = lat_2 - lat_1
  const deltaLong = long_2 - long_1

  const lat_mean = (lat_1 + lat_2)/2
  
  let helper = Math.cos(lat_mean)*deltaLong
  helper = helper*helper

  return EARTH_RAD_R * Math.sqrt(
    (deltaLat * deltaLat) + helper
  )
}

const DEG_TO_RAD_FACTOR = Math.PI / 180

/**
 * @param {double} deg - angle in degree
 * @return {double} - angle in radians
 */
function degToRad(deg){
  return DEG_TO_RAD_FACTOR*deg
}
