/**
 * @param {double} xLatitude
 * @param {double} xLongitude
 * @param {double} locLatitude
 * @param {double} locLongitude
 * @param {number} range
 */

export default function isNearLocation(xLatitude, xLongitude, locLatitude, locLongitude, range = 1.0){
  return (
    Math.abs(xLatitude - locLatitude) < range &&
    Math.abs(xLongitude - locLongitude ) < range 
  )
}
