import { mergeMap, catchError, switchMap } from 'rxjs/operators'
import { ofType, combineEpics } from 'redux-observable'
import { normalizeEntityArray, getSlugsEntityArray } from '../utils/transforms/entityArray.transforms.js'

import {
  LOAD_RESOURCE_START,
} from '../constants/resources.constants.js'

import { getStationUnlockable } from '../selectors/path.selectors.js'

import {
  loadResourcesSuccess,
  loadResourcesFail,
} from '../actions/resources.actions.js'

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
      //@TODO add to message
      console.error(e)
      return [
        loadResourcesFail()
      ]
    })
  )
}

export default combineEpics(
  loadResourcesEpic,
)
