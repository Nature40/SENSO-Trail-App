import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/textActivity.action.js'
import * as types from '../constants/textActivity.constants.js'
import * as epics from '../epics/textActivity.epics.js'
import reducer, { initialState } from '../reducers/textActivity.reducer.js'

import { ACTIVITY_TYPE_TEXT, COMPLETE_ACTIVITY } from '../constants/activity.constants.js'

/* eslint-env jest */

describe('textActivity Redux', () => {
  describe('actions', () => {
    it('should create an action to open the text content', () => {
      const expectedAction = {
        type: types.OPEN_TEXT,
        activityType: ACTIVITY_TYPE_TEXT,
        uuid: 'uuid1'
      }
      expect(actions.openText('uuid1')).toEqual(expectedAction)
    })
    it('should create an action to close the text content', () => {
      const expectedAction = {
        type: types.CLOSE_TEXT,
        activityType: ACTIVITY_TYPE_TEXT,
        uuid: 'uuid1'
      }
      expect(actions.closeText('uuid1')).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle OPEN_TEXT', () => {
      const state = {
        byUuid: {
          uuid1: {
            open: false
          },
          uuid2: {
            open: false
          }
        }
      }
      const action = {
        type: types.OPEN_TEXT,
        activityType: ACTIVITY_TYPE_TEXT,
        uuid: 'uuid1'
      }
      expect(reducer(state, action)).toEqual(
        {
          byUuid: {
            uuid1: {
              open: true
            },
            uuid2: {
              open: false
            }
          }
        }
      )
    })
    it('should handle CLOSE_TEXT', () => {
      const state = {
        byUuid: {
          uuid1: {
            open: true
          },
          uuid2: {
            open: true
          }
        }
      }
      const action = {
        type: types.CLOSE_TEXT,
        activityType: ACTIVITY_TYPE_TEXT,
        uuid: 'uuid2'
      }
      expect(reducer(state, action)).toEqual(
        {
          byUuid: {
            uuid1: {
              open: true
            },
            uuid2: {
              open: false
            }
          }
        }
      )
    })
  })
  describe('epics', () => {
    it('should dispatch COMPLETE_ACTIVITY if not completeted textActivity is opened', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.OPEN_TEXT,
          uuid: 'uuid1'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          activity: {
            byUuid: {
              uuid1: {}
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: COMPLETE_ACTIVITY,
          uuid: 'uuid1'
        }
      ]
      const res$ = epics.completeTextActivityEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should dispatch Nothing if completeted textActivity is opened', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.OPEN_TEXT,
          uuid: 'uuid1'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          activity: {
            byUuid: {
              uuid1: {
                completed: true
              }
            }
          }
        }
      )
      const expectedOutputActions = [
      ]
      const res$ = epics.completeTextActivityEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
