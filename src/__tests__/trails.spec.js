import * as actions from '../actions/trails.action.js'
import * as types from '../constants/trails.constants.js'
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
})
