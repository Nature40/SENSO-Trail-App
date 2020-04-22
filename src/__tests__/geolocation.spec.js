import { ActionsObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'

import * as actions from '../actions/geolocation.actions.js'
import * as types from '../constants/geolocation.constants.js'
import * as epics from '../epics/geolocation.epic.js'

/* eslint-env jest */
const latitude = 52.507351
const longitude = -6.127758

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
  describe('epics', () => {
    /* TODO
    it('should get the next options if there are such', (done) => {
      const action$ = ActionsObservable.of(
        actions.addChatMessage('text', types.SENDER_IS_SENSI)
      )

      // Mock of Ink Story
      function getCurrentStory () {
        return {
          next: 'Start',
          canContinue: false,
          Continue: function () { return this.next },
          currentChoices: _options()
        }
      }

      const expectedOutputAction = [
        {
          type: types.SET_CHAT_OPTIONS,
          options: _options()
        }
      ]

      const res$ = epics.getNextOptionOrContinue(action$, null, { getCurrentStory }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
    */
  })
})
