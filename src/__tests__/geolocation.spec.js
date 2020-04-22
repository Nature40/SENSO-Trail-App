import { ActionsObservable, StateObservable  } from 'redux-observable'
import { toArray } from 'rxjs/operators'
  import { Subject, from  } from 'rxjs'

import * as actions from '../actions/geolocation.actions.js'
import * as types from '../constants/geolocation.constants.js'
import reducer, { initialState } from '../reducers/geolocation.reducer.js'
import * as epics from '../epics/geolocation.epic.js'

import {
  LOAD_INK_JSON_START
} from '../constants/chat.constants.js'

/* eslint-env jest */
const latitude = 52.507351
const longitude = -6.127758

const sites = {
  "uuid1": {
    "uuid": "uuid1",
    "name":"Moskau Station",
    "storyUrl": "stories/moskau-ink-test.json",
    "latitude": 55.755826,
    "longitude": 37.6173
  },
  "uuid2": {
    "uuid":"uuid2",
    "name":"Berlin Station",
    "storyUrl": "stories/ink-test-story.json",
    "latitude": 52.520007,
    "longitude": 13.404954
  }
}

describe('geolocation redux', () => {
  describe('actions', () => {
    it('should create an action to change the current location', () => {
      const expectedAction = {
        type: types.GEOLOCATION_CHANGED,
        latitude,
        longitude
      }
      expect(actions.changeLocation(latitude, longitude)).toEqual(expectedAction)
    })

    it('should create an action to notify that an error occured', () => {
      const expectedAction = {
        type: types.GEOLOCATION_ERROR,
        error: 'ERROROBJECT'
      }
      expect(actions.locationError('ERROROBJECT')).toEqual(expectedAction)
    })
  })
  describe('trails reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })
    it('should handle SET_CURRENT_SITE', () => {
      const state = {
        currentSite: {
          uuid: "",
          siteType: "none"
        }
      }
      const action = {
        type: types.SET_CURRENT_SITE,
        uuid: "uuid1",
        siteType: "stations"
      }
      expect(reducer(state, action)).toEqual({
        currentSite: {
          uuid: "uuid1",
          siteType: "stations"
        }
      })
    })
    it('should handle GEOLOCATION_CHANGED', () => {
      const state = {
      currentLocation: {},
      }
      const action = {
        type: types.GEOLOCATION_CHANGED,
        latitude: latitude,
        longitude: longitude
      }
      expect(reducer(state, action)).toEqual({
        currentLocation: {
          latitude: latitude,
          longitude: longitude
        },
      })
    })
  })
  describe('epics', () => {
    it('dispatch LOAD_INK_JSON_START and SET_CURRENT_SITE if location is near a site', (done) => {

      const latitude = 55.755826
      const longitude = 37.6173
      const action$ = ActionsObservable.of(
        actions.changeLocation(latitude, longitude)
      )

      const expectedOutputAction = [
        {
          type: LOAD_INK_JSON_START,
          filename: "stories/moskau-ink-test.json",
        },{
          type: types.SET_CURRENT_SITE,
          uuid: "uuid1",
          siteType: "stations"
        }
      ]
      const state$ = new StateObservable(
        new Subject(),
        {
          resources: {
            stations: {
              ...sites
            }
          },
          geolocation: {
            ...initialState
          }
        }
      )

      const res$ = epics.changeLocationEpic(action$, state$ ).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
    it('should not dispatch anything if location is not near a site', (done) => {

      const latitude = 51.755826
      const longitude = 32.6173
      const action$ = ActionsObservable.of(
        actions.changeLocation(latitude, longitude)
      )

      const expectedOutputAction = [
      ]
      const state$ = new StateObservable(
        new Subject(),
        {
          resources: {
            stations: {
              ...sites
            }
          },
          geolocation: {
            ...initialState
          }
        }
      )

      const res$ = epics.changeLocationEpic(action$, state$ ).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
  })
})
