import * as actions from '../actions/messages.actions.js'
import * as types from '../constants/messages.constatns.js'
import reducer, { initialState } from '../reducers/messages.reducer.js'

/* eslint-env jest */
describe('messages redux', () => {
  describe('actions', () => {
    it('should create an action to add a new message', () => {
      const message = {
        type: 'MESSAGE_TYPE',
        text: 'Message Text'
      }
      const expectedAction = {
        type: types.ADD_MESSAGE,
        messageType: message.type,
        text: message.text,
        timestamp: 123
      }
      expect(actions.addMessage(message.type, message.text, 123)).toEqual(expectedAction)
    })
  })
  describe('reducer', () => {
    it('should return initialState on default', () => {
      expect(reducer(undefined, { type: '' })).toEqual(initialState)
    })
    it('should handle ADD_MESSAGE', () => {
      const state = {
        messages: []
      }
      const action = {
        type: types.ADD_MESSAGE,
        messageType: types.MESSAGE_TYPE_LOG,
        text: 'HALLO LOG',
        timestamp: 1234
      }
      expect(reducer(state, action)).toEqual({
        messages: [
          {
            messageType: types.MESSAGE_TYPE_LOG,
            text: 'HALLO LOG',
            timestamp: 1234
          }
        ]
      })
    })
  })
})
