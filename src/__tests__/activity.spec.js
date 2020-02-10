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
          uuid1: {
            slug: 'slug1'
          }
        },
        slugToUuid: {
          slug1: 'uuid1'
        }
      }

      expect(actions.loadActivitySuccess({ uuid1: { slug: 'slug1' } }, {slug1: 'uuid1'})).toEqual(expectedAction)
    })

    it('should create an complete activity action', () => {
      const expectedAction = {
        type: types.COMPLETE_ACTIVITY,
        uuid: 'uuid1',
        points: 100
      }

      expect(actions.completeActivity('uuid1', 100)).toEqual(expectedAction)
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
          uuid1: {
            slug: 'slug1'
          }
        },
        slugToUuid: {
          slug1: 'uuid1'
        },
      }
      const action = {
        type: types.LOAD_ACTIVITIES_SUCCESS,
        transformedActivities: {
          uuid2: {slug: 'slug2'},
          uuid3: {slug: 'slug3'}
        },
        slugToUuid: {
          slug2: 'uuid2',
          slug3: 'uuid3'
        },
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {
          uuid1: {slug: 'slug1'},
          uuid2: {slug: 'slug2'},
          uuid3: {slug: 'slug3'}
        },
        slugToUuid: {
          slug1: 'uuid1',
          slug2: 'uuid2',
          slug3: 'uuid3'
        },
      })
    })
    it('should override existing data on LOAD_ACTIVITIES_SUCCESS', () => {
      const state = {
        loading: true,
        byUuid: {
          uuid1: {
            completed: true
          }
        },
        slugToUuid: {
          slug1: 'uuid1'
        },
      }
      const action = {
        type: types.LOAD_ACTIVITIES_SUCCESS,
        transformedActivities: {
          uuid1: {}
        },
        slugToUuid: {
          slug1: 'uuid1'
        }
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {
          uuid1: {}
        },
        slugToUuid: {
          slug1: 'uuid1'
        },
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
        uuid: 'uuid1',
        points: 100
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
              activities: ['uuid1'],
              slug: 'station1'
            },
            station2: {
              activities: ['uuid2', 'uuid3'],
              slug: 'station2'
            }
          },
          slugToUuid: {
            station1: 'station1',
            station2: 'station2'
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
        uuid: 'uuid1',
        slug: 'slug1'
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
          },
          slugToUuid: {
            slug1: 'uuid1'
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
    it('loadREsourceEpic should dispatch LOAD_RESOURCE_SUCCESS if resource had been loaded', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.LOAD_RESOURCE_START,
          resourceUrls: ['test1.jpg','test2.jpg'],
          uuids: ['uuid1']
        }
      )
      const expectedOutputActions = [
        {
          type: types.LOAD_RESOURCE_SUCCESS,
          uuids: ['uuid1']
        }
      ]

      const getResources = (url) => new Promise((resolve) => { resolve(true) })
      const res$ = epics.loadActivitiesResourceEpic(action$, null, {getResources}).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('loadREsourceEpic should dispatch LOAD_RESOURCE_FAIL if resource loading failed', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.LOAD_RESOURCE_START,
          resourceUrls: ['test1.jpg','test2.jpg'],
          uuids: ['uuid1']
        }
      )
      const expectedOutputActions = [
        {
          type: types.LOAD_RESOURCE_FAIL
        }
      ]

      const getResources = (url) => new Promise((resolve,reject) => { reject() })
      const res$ = epics.loadActivitiesResourceEpic(action$, null, {getResources}).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
