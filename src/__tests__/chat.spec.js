import { ActionsObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'

import * as actions from '../actions/chat.actions.js'
import * as types from '../constants/chat.constants.js'
// import * as epics from '../epics/chat.epic.js'
import reducer, { initialState } from '../reducers/chat.reducer.js'


/* eslint-env jest */

const testMsg = {
  sender: 'Someone',
  message: 'Hello World'
}

describe('chats redux', () => {
  describe('actions', () => {
    it('should create an action to add a new chat message', () => {
        const expectedAction = {
          type: types.ADD_CHAT_MESSAGE,
          ...testMsg
        }
        expect(actions.addChatMessage(testMsg.message, testMsg.sender)).toEqual(expectedAction)
      })
    })
    describe('reducer', () => {
      it('should return initialState on default', () => {
        expect(reducer(undefined, { type: '' })).toEqual(initialState)
      })
      it('should handle ADD_CHAT_MESSAGE', () => {
        const state = {
          messageQueue: []
        }

        const action = {
          type: types.ADD_CHAT_MESSAGE,
          ...testMsg
        }
        expect(reducer(state, action)).toEqual({
          messageQueue: [
            {...testMsg}
          ]
        })
      })
    })
    /*describe('epics', () => {
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
  })*/
})

