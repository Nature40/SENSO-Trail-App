import { ActionsObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'

import * as actions from '../actions/score.actions.js'
import * as types from '../constants/score.constants.js'
import * as epics from '../epics/score.epics.js'
import reducer, { initialState } from '../reducers/score.reducer.js'

import {
  START_TRAIL_SUCCESS
} from '../constants/trails.constants.js'

import {
  COMPLETE_ACTIVITY
} from '../constants/activity.constants.js'

/* eslint-env jest */

describe('score redux', () => {
  describe('actions', () => {
    it('should create an action to add to the score', () => {
      const expectedAction = {
        type: types.ADD_POINTS,
        points: 100
      }

      expect(actions.addPoints(100)).toEqual(expectedAction)
    })

    it('should create an action to reset the score', () => {
      const expectedAction = {
        type: types.RESET_SCORE
      }

      expect(actions.resetScore()).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle ADD_POINTS', () => {
      const state = {
        score: 0
      }
      const action = {
        type: types.ADD_POINTS,
        points: 100
      }
      expect(reducer(state, action)).toEqual({
        score: 100
      })
    })

    it('should handle RESET_SCORE', () => {
      const state = {
        score: 1000
      }
      const action = {
        type: types.RESET_SCORE
      }
      expect(reducer(state, action)).toEqual({
        score: 0
      })
    })
  })

  describe('redux observables', () => {
    it('should dispatch RESET_SCORE when a trail is started', (done) => {
      const action$ = ActionsObservable.of(
        { type: START_TRAIL_SUCCESS }
      )

      const expectedOutputActions = [
        {
          type: types.RESET_SCORE
        }
      ]
      const res$ = epics.resetScoreEpic(action$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })

    it('should dispatch ADD_POINTS on COMPLETE_ACTIVITY', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: COMPLETE_ACTIVITY,
          points: 100
        }
      )

      const expectedOutputActions = [
        {
          type: types.ADD_POINTS,
          points: 100
        }
      ]
      const res$ = epics.addPointsEpic(action$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })

    it('should not dispatch ADD_POINTS on COMPLETE_ACTIVITY and points are 0', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: COMPLETE_ACTIVITY,
          points: 0
        }
      )

      const expectedOutputActions = [
      ]
      const res$ = epics.addPointsEpic(action$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
