import { mergeMap, catchError } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray } from '../utils/transforms/entityArray.transforms.js'

import {
  LOAD_RESOURCE_START,
  PRELOAD_CACHE_DATA
} from '../constants/resources.constants.js'

import {
  loadResourcesSuccess,
  loadResourcesFail,
  preloadCacheDataFinished,
  preloadCacheDataFail,
} from '../actions/resources.actions.js'

import {
  getServiceWorkerStatus
} from '../selectors/resources.selector.js'

export function loadResourcesEpic (action$, state$, { fetchJSON }) {
  return action$.pipe(
    ofType(LOAD_RESOURCE_START),
    mergeMap(async action => {
      const url = process.env.PUBLIC_URL + '/json/'+action.source
      const result = await fetchJSON(url)
      const normalizedResult = normalizeEntityArray([result])
      return loadResourcesSuccess(normalizedResult)
    }),
    catchError((e) => {
      return [
        loadResourcesFail()
      ]
    })
  )
}

export function preloadCacheData (action$, state$, { fetch }) {
  return action$.pipe(
    ofType(PRELOAD_CACHE_DATA),
    mergeMap(async action => {
      const serviceWorkerActive = getServiceWorkerStatus(state$.value)
      if(serviceWorkerActive){
        window.navigator.serviceWorker.controller.postMessage({
          type: 'NATURE40_ADD_ROUTE',
          routes: action.urls
        })
        const result = await Promise.all(action.urls.map(u => {
          console.log("fetching ", u)
          return fetch(u)
        }))
        
        return preloadCacheDataFinished(action.urls)
      }
      return preloadCacheDataFail("No Service Worker active")
    }),
    catchError((e) => {
      return [
        preloadCacheDataFail(e)
      ]
    })
  )
}


export default combineEpics(
  loadResourcesEpic,
  preloadCacheData 
)
