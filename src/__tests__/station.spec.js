import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/station.action.js'
import * as types from '../constants/station.constants.js'
import * as epics from '../epics/station.epics.js'
import reducer, { initialState } from '../reducers/station.reducer.js'

/* eslint-env jest */

describe('stations redux', () => {
  describe('actions', () => {
    it('should create an action to load the stations', () => {
      const expectedAction = {
        type: types.LOAD_STATION_START,
        uuids: ['uuid1', 'uuid2']
      }

      expect(actions.loadStations(['uuid1', 'uuid2'])).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle LOAD_STATION_START', () => {
      const state = {
        loading: false,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_STATION_START
      }
      expect(reducer(state, action)).toEqual({
        loading: true,
        byUuid: {}
      })
    })

    it('should handle LOAD_STATION_FAIL', () => {
      const state = {
        loading: true,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_STATION_FAIL
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {}
      })
    })

    it('should handle LOAD_STATION_SUCCESS', () => {
      const state = {
        loading: true,
        byUuid: {
          uuid1: {}
        }
      }
      const action = {
        type: types.LOAD_STATION_SUCCESS,
        transformedStations: {
          uuid2: {},
          uuid3: {}
        }
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {
          uuid1: {},
          uuid2: {},
          uuid3: {}
        }
      })
    })
  })

  describe('epics', () => {
    it('should dispatch LOAD_STATION_SUCCESS when it loads correct data', (done) => {
      const testStation = {
        uuid: 'uuid1'
      }
      const action$ = ActionsObservable.of(
        { type: types.LOAD_STATION_START }
      )
      const fetchJSON = (url) => new Promise((resolve) => { resolve([testStation]) })

      const expectedOutputActions = [
        {
          type: types.LOAD_STATION_SUCCESS,
          transformedStations: {
            uuid1: { ...testStation }
          }
        }
      ]
      const res$ = epics.loadStationsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should dispatch LOAD_STATION_FAIL when it does not load correct data', (done) => {
      const action$ = ActionsObservable.of(
        { type: types.LOAD_STATION_START }
      )
      const fetchJSON = (url) => new Promise((resolve, reject) => { reject() })

      const expectedOutputActions = [
        {
          type: types.LOAD_STATION_FAIL
        }
      ]
      const res$ = epics.loadStationsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
