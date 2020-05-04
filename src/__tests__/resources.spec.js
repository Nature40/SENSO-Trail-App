import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/resources.actions.js'
import * as types from '../constants/resources.constants.js'
import * as epics from '../epics/resources.epics.js'
import reducer, { initialState } from '../reducers/resources.reducer.js'

/* eslint-env jest */

describe('resources redux', () => {
  describe('actions', () => {
    it('should create an action to load the resources', () => {
      const expectedAction = {
        type: types.LOAD_RESOURCE_START,
        source: 'source.json'
      }

      expect(actions.loadResource('source.json')).toEqual(expectedAction)
    })

    it('should create an action to successfull finsish loading resources', () => {
      const transformedResources = {
        'uuid1':{
          uuid: 'uuid1',
        }
      }
      const expectedAction = {
        type: types.LOAD_RESOURCE_SUCCESS,
        transformedResources,
      }

      expect(actions.loadResourcesSuccess(transformedResources)).toEqual(expectedAction)
    })

    it('should create an action to fail loading resources', () => {
      const expectedAction = {
        type: types.LOAD_RESOURCE_FAIL
      }

      expect(actions.loadResourcesFail()).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle LOAD_RESOURCE_START for stations', () => {
      const state = {
        loading: false,
        stations: {},
      }
      const action = {
        type: types.LOAD_RESOURCE_START
      }
      expect(reducer(state, action)).toEqual({
        loading: true,
        stations: {},
      })
    })

    it('should handle LOAD_RESOURCE_FAIL', () => {
      const state = {
        loading: true,
        stations: {},
      }
      const action = {
        type: types.LOAD_RESOURCE_FAIL
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        stations: {},
      })
    })

    it('should handle LOAD_RESOURCE_SUCCESS', () => {
      const state = {
        loading: true,
        stations: {
          uuid1: {
          }
        }
      }
      const action = {
        type: types.LOAD_RESOURCE_SUCCESS,
        transformedResources: {
          uuid2: {
          }
        },
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        stations: {
          uuid1: {
          },
          uuid2: {
          }   
        },
      })
    })
  })

  describe('epics', () => {
    it('should dispatch LOAD_RESOURCE_SUCCESS when it loads correct data', (done) => {
      const testResources = {
        uuid: 'uuid1',
      }
      const action$ = ActionsObservable.of(
        { type: types.LOAD_RESOURCE_START }
      )
      const fetchJSON = (url) => new Promise((resolve) => { resolve(testResources) })

      const expectedOutputActions = [
        {
          type: types.LOAD_RESOURCE_SUCCESS,
          transformedResources: {
            uuid1: { ...testResources }
          },
        }
      ]
      const res$ = epics.loadResourcesEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should first dispatch LOAD_RESOURCE_FAIL when it does not load correct data', (done) => {
      const action$ = ActionsObservable.of(
        { type: types.LOAD_RESOURCE_START }
      )
      const fetchJSON = (url) => new Promise((resolve, reject) => { reject() })

      const expectedOutputFirstAction = {
        type: types.LOAD_RESOURCE_FAIL
      }
      const res$ = epics.loadResourcesEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions[0]).toEqual(expectedOutputFirstAction)
        done()
      })
    })
  })
})
