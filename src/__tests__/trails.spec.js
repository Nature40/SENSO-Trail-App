import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/trails.action.js'
import * as types from '../constants/trails.constants.js'
import * as epics from '../epics/trails.epics.js'
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
    it('should create an action to start a trail', () => {
      const expectedAction = {
        type: types.START_TRAIL_BEGIN,
        trailId: 'id'
      }
      expect(actions.startTrail('id')).toEqual(expectedAction)
    })
    it('should create an action to cancel a trailstart', () => {
      const expectedAction = {
        type: types.START_TRAIL_CANCEL
      }
      expect(actions.cancelStartTrail()).toEqual(expectedAction)
    })
    it('should create an trail start success action to accept a trailstart', () => {
      const expectedAction = {
        type: types.START_TRAIL_SUCCESS,
        trailId: 'id'
      }
      expect(actions.acceptStartTrail('id')).toEqual(expectedAction)
    })
  })

  describe('trails reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle START_TRAIL_CANCEL', () => {
      const state = {
        current_trail: 'trailid',
        error: {}
      }
      const action = {
        type: types.START_TRAIL_CANCEL
      }
      expect(reducer(state, action)).toEqual({
        current_trail: 'trailid',
        error: undefined
      })
    })

    it('should handle START_TRAIL_REJECT', () => {
      const state = {
        current_trail: 'trailid',
        error: undefined
      }
      const action = {
        type: types.START_TRAIL_REJECT,
        trailId: 'trailid2'
      }
      expect(reducer(state, action)).toEqual({
        current_trail: 'trailid',
        error: {
          selected_trail: 'trailid2'
        }
      })
    })

    it('should handle START_TRAIL_SUCCESS', () => {
      const state = {
        error: {}
      }
      const action = {
        type: types.START_TRAIL_SUCCESS,
        trailId: 'trailid'
      }
      expect(reducer(state, action)).toEqual({
        current_trail: 'trailid',
        error: undefined
      })
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

    it('should handle LOAD_TRAILS_FAIL', () => {
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

  describe('epics', () => {
    it('startTrailEpic should dispatch START_TRAIL_SUCCESS when current_trail is undefined', (done) => {
      const trailId = 'trailid'
      const action$ = ActionsObservable.of(
        {
          type: types.START_TRAIL_BEGIN,
          trailId
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {}
        }
      )
      const expectedOutputActions = [
        {
          type: types.START_TRAIL_SUCCESS,
          trailId
        }
      ]
      const res$ = epics.startTrailEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('startTrailEpic should dispatch START_TRAIL_REJECT when current_trail is defined', (done) => {
      const currentTrailId = 'trailid'
      const newTrailId = 'trailid2'
      const action$ = ActionsObservable.of(
        {
          type: types.START_TRAIL_BEGIN,
          trailId: newTrailId
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {
            current_trail: currentTrailId
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.START_TRAIL_REJECT,
          trailId: newTrailId
        }
      ]
      const res$ = epics.startTrailEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
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
      const res$ = epics.loadTrailsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })

    it('loadTrailsEpic should dispatch LOAD_TRAILS_FAIL when it does not load correct data', (done) => {
      const action$ = ActionsObservable.of(
        { type: types.LOAD_TRAILS_START }
      )
      const fetchJSON = (url) => new Promise((resolve, reject) => { reject() })

      const expectedOutputActions = [
        {
          type: types.LOAD_TRAILS_FAIL
        }
      ]
      const res$ = epics.loadTrailsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
