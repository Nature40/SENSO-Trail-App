import { LOAD_TRAILS_START, LOAD_TRAILS_SUCCESS, LOAD_TRAILS_FAIL } from '../constants/trails.constants.js'
import { mergeMap, catchError } from 'rxjs/operators'
import { of } from 'rxjs'
import { ofType } from 'redux-observable'
import { normalizeTrails } from '../utils/transforms/trails.transforms.js'

export const loadTrailsEpic = (action$, state$, { fetchJSON }) => action$.pipe(
  ofType(LOAD_TRAILS_START),
  mergeMap(async action => {
    const url = process.env.PUBLIC_URL + '/json/trailslist.json'
    const result = await fetchJSON(url)
    return {
      type: LOAD_TRAILS_SUCCESS,
      transformedTrails: normalizeTrails(result)
    }
  }),
  catchError((e) => {
    console.error(e)
    return of({
      type: LOAD_TRAILS_FAIL,
    })
  })
)
