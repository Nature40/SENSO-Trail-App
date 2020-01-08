import { createSelector } from 'reselect'
import { selectCurrentTrailId, selectTrailsByUuid, selectCurrentTrailsStation } from './trails.selectors.js'
import { selectStations } from './station.selectors.js'
import { selectActivities } from './activity.selectors.js'

export const getPath = createSelector(
  [
    selectCurrentTrailId, 
    selectTrailsByUuid, 
    selectStations, 
    selectActivities
  ],
  (trailUuid, trails, stations, activities) => {
    if(!trailUuid) return []
    console.log("BUILD PATH")
    let accessible = trails[trailUuid].stations
      .map(
        (uuid) => {
          let ret = [ 
            stations[uuid].slug 
          ]
          if(stations[uuid].unlocked) {
            ret.push(...(stations[uuid].activities.map(
              (aUuid) => stations[uuid].slug + "/" + activities[aUuid].slug
            )))
          }
          return ret
        }
      )
      .flat()
    accessible.unshift("")

   /* let unaccessible = trails[trailUuid].stations
      .filter((val, idx) => idx > currentStation)
      .map(
        (uuid) => [ 
          stations[uuid].slug,
          ...(stations[uuid].activities.map(
            (aUuid) => stations[uuid].slug + "/" + activities[aUuid].slug
          ))
        ]
      )
      .flat()

    if(unaccessible.length > 0){
      accessible.push(unaccessible.shift())
    }*/
    return accessible
  }
)

function selectStationUuid ( state, {uuid} ) {
  return uuid
}

export const getStationUnlockable = createSelector(
  [
    selectStationUuid,
    selectCurrentTrailId, 
    selectTrailsByUuid, 
    selectStations, 
    selectActivities
  ],
  (stationUuid, trailUuid, trails, stations, activities) => {
    if(!trailUuid) return false
    
    let unlockIdx = trails[trailUuid].stations.indexOf(stationUuid)
    if(unlockIdx < 0) return false
    return trails[trailUuid].stations
      .filter((val, idx) => idx < unlockIdx)
      .map(
        (uuid) => stations[uuid].activities.map(
          (aUuid) => (activities[aUuid].completed || false)
        )
      )
      .flat()
      .reduce((acc, cur) => acc && cur, true)

  }
)
