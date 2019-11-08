import { ActionsObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'

import * as actions from '../actions/trails.action.js'
import * as types from '../constants/trails.constants.js'
import { loadTrailsEpic } from '../epics/trails.epics.js'
import reducer, { initialState } from '../reducers/trails.reducer.js'

/* eslint-env jest */

describe('trails redux', () => {
  describe('actions', () => {
    it('should create an action to load the trails', () => {
      const expectedAction = {
        type: types.LOAD_TRAILS_START
      }
      expect(actions.loadTrails()).toEqual(expectedAction)
    })
  })

  describe('trails reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    it('should handle LOAD_TRAILS_START', () => {
      const state = {
        loading: false,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_TRAILS_START
      }
      expect(reducer(state, action)).toEqual({
        loading: true,
        byUuid: {}
      })
    })

    it('should handle LOAD_TRAILS_START', () => {
      const state = {
        loading: true,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_TRAILS_FAIL
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {}
      })
    })

    it('should handle LOAD_TRAILS_SUCCESS', () => {
      const state = {
        loading: false,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_TRAILS_SUCCESS,
        transformedTrails: {
          'uuid-1': {},
          'uuid-2': {}
        }
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {
          'uuid-1': {},
          'uuid-2': {}
        }
      })
    })
  })

  describe('loadTrailsEpic', () => {
    it('loadTrailsEpic should dispatch LOAD_TRAILS_SUCCESS when it loads correct data', (done) => {
      const testTrail = {
        uuid: 'uuid1',
        name: 'testtrail1'
      }
      const action$ = ActionsObservable.of(
        { type: types.LOAD_TRAILS_START }
      )
      const fetchJSON = (url) => new Promise((resolve) => { resolve([testTrail]) })

      const expectedOutputActions = [
        {
          type: types.LOAD_TRAILS_SUCCESS,
          transformedTrails: {
            uuid1: { ...testTrail }
          }
        }
      ]
      const res$ = loadTrailsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })

    it('loadTrailsEpic should dispatch LOAD_TRAILS_SUCCESS when it loads correct data', (done) => {
      const action$ = ActionsObservable.of(
        { type: types.LOAD_TRAILS_START }
      )
      const fetchJSON = (url) => new Promise((resolve, reject) => { reject() })

      const expectedOutputActions = [
        {
          type: types.LOAD_TRAILS_FAIL
        }
      ]
      const res$ = loadTrailsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
