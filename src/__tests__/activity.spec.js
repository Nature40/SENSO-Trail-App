import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/activity.action.js'
import * as types from '../constants/activity.constants.js'
import * as epics from '../epics/activity.epics.js'
import reducer, { initialState } from '../reducers/activity.reducer.js'

import {
  LOAD_STATION_SUCCESS
} from '../constants/station.constants.js'

/* eslint-env jest */

describe('activity redux', () => {
  describe('actions', () => {
    it('should create an action to load Activities', () => {
      const expectedAction = {
        type: types.LOAD_ACTIVITIES_START,
        uuids: ['uuid1']
      }

      expect(actions.loadActivity(['uuid1'])).toEqual(expectedAction)
    })

    it('should create an load success action', () => {
      const expectedAction = {
        type: types.LOAD_ACTIVITIES_SUCCESS,
        transformedActivities: {
          uuid1: {}
        }
      }

      expect(actions.loadActivitySuccess({ uuid1: {} })).toEqual(expectedAction)
    })

    it('should create an complete activity action', () => {
      const expectedAction = {
        type: types.COMPLETE_ACTIVITY,
        uuid: 'uuid1'
      }

      expect(actions.completeActivity('uuid1')).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the intitialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle LOAD_ACTIVITIES_START', () => {
      const state = {
        loading: false,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_ACTIVITIES_START
      }
      expect(reducer(state, action)).toEqual({
        loading: true,
        byUuid: {}
      })
    })

    it('should handle LOAD_ACTIVITIES_FAIL', () => {
      const state = {
        loading: true,
        byUuid: {}
      }
      const action = {
        type: types.LOAD_ACTIVITIES_FAIL
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {}
      })
    })

    it('should handle LOAD_ACTIVITIES_SUCCESS', () => {
      const state = {
        loading: true,
        byUuid: {
          uuid1: {}
        }
      }
      const action = {
        type: types.LOAD_ACTIVITIES_SUCCESS,
        transformedActivities: {
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
    it('should override existing data on LOAD_ACTIVITIES_SUCCESS', () => {
      const state = {
        loading: true,
        byUuid: {
          uuid1: {
            completed: true
          }
        }
      }
      const action = {
        type: types.LOAD_ACTIVITIES_SUCCESS,
        transformedActivities: {
          uuid1: {}
        }
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {
          uuid1: {}
        }
      })
    })
    it('should handle COMPLETE_ACTIVITY', () => {
      const state = {
        byUuid: {
          uuid1: {},
          uuid2: {}
        }
      }
      const action = {
        type: types.COMPLETE_ACTIVITY,
        uuid: 'uuid1'
      }
      expect(reducer(state, action)).toEqual({
        byUuid: {
          uuid1: {
            completed: true
          },
          uuid2: {}
        }
      })
    })
  })
  describe('epics', () => {
    it('should dispatch LOAD_ACTIVITIES_START when stations finished loading', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: LOAD_STATION_SUCCESS,
          transformedStations: {
            station1: {
              activities: ['uuid1']
            },
            station2: {
              activities: ['uuid2', 'uuid3']
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.LOAD_ACTIVITIES_START,
          uuids: ['uuid1', 'uuid2', 'uuid3']
        }
      ]
      const res$ = epics.startLoadActivitiesEpic(action$, null).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should dispatch LOAD_ACTIVITIES_SUCCESS when it loads correct data', (done) => {
      const testActivity = {
        uuid: 'uuid1'
      }
      const action$ = ActionsObservable.of(
        { type: types.LOAD_ACTIVITIES_START }
      )
      const fetchJSON = (url) => new Promise((resolve) => { resolve([testActivity]) })

      const expectedOutputActions = [
        {
          type: types.LOAD_ACTIVITIES_SUCCESS,
          transformedActivities: {
            uuid1: { ...testActivity }
          }
        }
      ]
      const res$ = epics.loadActivitiesEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should dispatch LOAD_ACTIVITIES_FAIL when it does not load correct data', (done) => {
      const action$ = ActionsObservable.of(
        { type: types.LOAD_ACTIVITIES_START }
      )
      const fetchJSON = (url) => new Promise((resolve, reject) => { reject() })

      const expectedOutputActions = [
        {
          type: types.LOAD_ACTIVITIES_FAIL
        }
      ]
      const res$ = epics.loadActivitiesEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
