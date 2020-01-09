import { ofType, combineEpics } from 'redux-observable'
import { mergeMap, catchError, map } from 'rxjs/operators'
import { filter } from 'rxjs/operators';

import {
  LOAD_ACTIVITIES_SUCCESS,
  ACTIVITY_TYPE_IMAGE 
} from '../constants/activity.constants.js'

import {
  loadResource
} from '../actions/activity.action.js'

/**
 * load images for caching 
 * detect image activities and dispatch loadResource Action
 */
export function detectImageResourceEpic (action$, state$) {
  return action$.pipe(
    ofType(LOAD_ACTIVITIES_SUCCESS),
    filter((action) => {
      const activities = action.transformedActivities
      for(let key in activities){
        if(activities[key].activityType === ACTIVITY_TYPE_IMAGE){
          return true
        }
      }
      return false
    }),
    map(action => {
      let activities = Object.values(action.transformedActivities)
      activities = activities.filter(a => {
        return a.activityType === ACTIVITY_TYPE_IMAGE
      })

      const resourceUrls = activities.map((a) => a.image.src)
      const uuids = activities.map((a) => a.uuid)
      return loadResource(uuids, resourceUrls)
    })
  )
}

export default combineEpics(
  detectImageResourceEpic
)
