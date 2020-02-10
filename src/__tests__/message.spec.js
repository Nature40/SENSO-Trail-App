import { ActionsObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'

import * as actions from '../actions/messages.actions.js'
import * as types from '../constants/messages.constatns.js'
import * as epics from '../epics/message.epic.js'
import reducer, { initialState } from '../reducers/messages.reducer.js'


/* eslint-env jest */

describe('messages redux', () => {
  describe('actions', () => {
    it('should create an action to add a new message', () => {
        const message = {
          type: 'MESSAGE_TYPE',
          text: 'Message Text'
        }

        const timestamp = Date.now()

        const uuid = 'uuid1'

        const expectedAction = {
          type: types.ADD_MESSAGE,
          messageType: message.type,
          text: message.text,
          timestamp,
          uuid
        }
        expect(actions.addMessage(message.type, message.text, uuid, timestamp)).toEqual(expectedAction)
      })
      it('should create an action to hide a message', () => {
        const uuid = 'uuid1'

        const expectedAction = {
          type: types.HIDE_MESSAGE,
          uuid
        }
        expect(actions.hideMessage(uuid)).toEqual(expectedAction)
      })
    })
    describe('reducer', () => {
      it('should return initialState on default', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState)
      })
      it('should handle ADD_MESSAGE', () => {
        const state = {
        }
        const timestamp = Date.now()

        const action = {
          type: types.ADD_MESSAGE,
          messageType: types.MESSAGE_TYPE_LOG,
          text: 'HALLO LOG',
          timestamp,
          uuid: 'uuid1'
        }
        expect(reducer(state, action)).toEqual({
          byUuid: {
            uuid1: {
              messageType: types.MESSAGE_TYPE_LOG,
              text: 'HALLO LOG',
              timestamp,
              uuid: 'uuid1'
            }
          }
        })
      })
      it('should handle ADD_MESSAGE', () => {
        const timestamp = Date.now()

        const state = {
          byUuid: {
            uuid1: {
              messageType: types.MESSAGE_TYPE_LOG,
              text: 'HALLO LOG',
              timestamp,
              uuid: 'uuid1'
            }
          }
        }

        const action = {
          type: types.HIDE_MESSAGE,
          uuid: 'uuid1'
        }

        expect(reducer(state, action)).toEqual({
          byUuid: {
            uuid1: {
              messageType: types.MESSAGE_TYPE_LOG,
              text: 'HALLO LOG',
              timestamp,
              uuid: 'uuid1',
              hide: true
            }
          }
        })
      })
    })
    describe('epics', () => {
      it('genEpics should generate an message epic that dispatch its message when the trigger is dispatched', (done) => {
      const messageSpec = {
        trigger: 'TRIGGER_ACTION',
        type: types.MESSAGE_TYPE_LOG,
        message: 'action is triggerd'
      }

      const epic = epics.genEpic(messageSpec)

      const action$ = ActionsObservable.of(
        { type: 'TRIGGER_ACTION' }
      )

      const expectedOutputActions = [
        {
          type: types.ADD_MESSAGE,
          text: 'action is triggerd',
          messageType: types.MESSAGE_TYPE_LOG,
          uuid: 'something', // not tested
          timestamp: 123 // not tested
        }
      ]
      const res$ = epic(action$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions[0].type).toEqual(expectedOutputActions[0].type)
        expect(actualOutputActions[0].text).toEqual(expectedOutputActions[0].text)
        expect(actualOutputActions[0].messageType).toEqual(expectedOutputActions[0].messageType)
        done()
      })
    })
    it('hideMessage Epic should dispatch HIDE_MESSAGE after a delay', (done) => {
      const timestamp = Date.now()

      const uuid = 'uuid1'

      const action$ = ActionsObservable.of(
        {
          type: types.ADD_MESSAGE,
          messageType: types.MESSAGE_TYPE_LOG,
          text: 'HALLO WELT',
          timestamp,
          uuid
        }
      )

      const expectedOutputActions = [
        {
          type: types.HIDE_MESSAGE,
          uuid
        }
      ]
      const res$ = epics.hideMessageEpic(action$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})

