import { ActionsObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'

import * as actions from '../actions/chat.actions.js'
import * as types from '../constants/chat.constants.js'
import * as epics from '../epics/chat.epic.js'
// import * as epics from '../epics/chat.epic.js'
import reducer, { initialState } from '../reducers/chat.reducer.js'

/* eslint-env jest */

const testMsg = {
  sender: 'Someone',
  message: 'Hello World'
}

const _options = () => {
  return [
    {
      text: 'option1',
      index: 0
    },
    {
      text: 'option2',
      index: 1
    }
  ]
}

describe('chats redux', () => {
  describe('actions', () => {
    it('should create an action to add a new chat message without tags', () => {
      const expectedAction = {
        type: types.ADD_CHAT_MESSAGE,
        ...testMsg,
        tags: {}
      }
      expect(actions.addChatMessage(testMsg.message, testMsg.sender)).toEqual(expectedAction)
    })
    it('should create an action to add a new chat message with tags', () => {
      const expectedAction = {
        type: types.ADD_CHAT_MESSAGE,
        ...testMsg,
        tags: {test:'tag'}
      }
      expect(actions.addChatMessage(testMsg.message, testMsg.sender, {test:'tag'})).toEqual(expectedAction)
    })
    it('should create an action to set Chat Options', () => {
      const expectedAction = {
        type: types.SET_CHAT_OPTIONS,
        options: _options()
      }
      expect(actions.setChatOptions(_options())).toEqual(expectedAction)
    })
    it('should create an action to choose a chat option', () => {
      const expectedAction = {
        type: types.CHOOSE_CHAT_OPTION,
        option: 1
      }
      expect(actions.chooseChatOption(1)).toEqual(expectedAction)
    })
    it('should create an action to mark messages read', () => {
      const expectedAction = {
        type: types.MARK_MESSAGE_READ,
        index: 1
      }
      expect(actions.markMessageRead(1)).toEqual(expectedAction)
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
          { ...testMsg, read:false, tags: {} }
        ]
      })
    })
    it('should handle MARK_MESSAGE_READ, by marking all messages below index read', () => {
      const state = {
        messageQueue: [
          {
            ...testMsg,
            read: false,
          },
          {
            ...testMsg,
            read: false,
          },
          {
            ...testMsg,
            read: false,
          },
        ]
      }

      const action = {
        type: types.MARK_MESSAGE_READ,
        index: 1
      }
      expect(reducer(state, action)).toEqual({
        lastRead: 1,
        messageQueue: [
          {
            ...testMsg,
            read: true,
          },
          {
            ...testMsg,
            read: true,
          },
          {
            ...testMsg,
            read: false,
          },
        ]
      })
    })
    it('should handle SET_CHAT_OPTIONS', () => {
      const state = {
        chatOptions: []
      }

      const action = {
        type: types.SET_CHAT_OPTIONS,
        options: _options()
      }
      expect(reducer(state, action)).toEqual({
        chatOptions: _options()
      })
    })
  })
  describe('epics', () => {
    it('should send a chat message after an option is choosen', (done) => {
      const action$ = ActionsObservable.of(
        actions.chooseChatOption(1)
      )

      // Mock of Ink Story
      function getCurrentStory () {
        return {
          next: 'Start',
          Continue: function () { return this.next },
          currentChoices: ['1', '2'],
          ChooseChoiceIndex: function () { this.next = 'Next Text' }
        }
      }

      const expectedOutputAction = [
        {
          type: types.ADD_CHAT_MESSAGE,
          message: 'Next Text',
          sender: types.SENDER_IS_PLAYER,
          tags: {}
        }
      ]

      const res$ = epics.sendChatMessage(action$, null, { getCurrentStory }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
    it('should start the chat if option is -1', (done) => {
      const action$ = ActionsObservable.of(
        actions.chooseChatOption(-1)
      )

      // Mock of Ink Story
      function getCurrentStory () {
        return {
          next: 'Start',
          Continue: function () { return this.next },
          currentChoices: ['1', '2'],
          ChooseChoiceIndex: function () { this.next = 'Next Text' }
        }
      }

      // Mock Tag extract
      function extractTags (story) {
        return {}
      }

      const expectedOutputAction = [
        {
          type: types.ADD_CHAT_MESSAGE,
          message: 'Start',
          sender: types.SENDER_IS_SENSI,
          tags: {}
        }
      ]


      const res$ = epics.sendChatMessage(action$, null, { getCurrentStory, extractTags }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
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
    it('should set the options empty if there are none', (done) => {
      const action$ = ActionsObservable.of(
        actions.addChatMessage('text', types.SENDER_IS_SENSI)
      )

      // Mock of Ink Story
      function getCurrentStory () {
        return {
          next: 'Start',
          canContinue: false,
          Continue: function () { return this.next },
          currentChoices: []
        }
      }
      // Mock Tag extract
      function extractTags (story) {
        return {}
      }

      const expectedOutputAction = [
        {
          type: types.SET_CHAT_OPTIONS,
          options: []
        }
      ]

      const res$ = epics.getNextOptionOrContinue(action$, null, { getCurrentStory, extractTags }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
    it('should continue if it can continue', (done) => {
      const action$ = ActionsObservable.of(
        actions.addChatMessage('text', types.SENDER_IS_SENSI)
      )

      // Mock of Ink Story
      function getCurrentStory () {
        return {
          next: 'Next Message',
          canContinue: true,
          Continue: function () { return this.next },
          currentChoices: []
        }
      }
      // Mock Tag extract
      function extractTags (story) {
        return {}
      }

      const expectedOutputAction = [
        {
          type: types.ADD_CHAT_MESSAGE,
          message: 'Next Message',
          sender: types.SENDER_IS_SENSI,
          tags: {}
        }
      ]

      const res$ = epics.getNextOptionOrContinue(action$, null, { getCurrentStory, extractTags }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputAction => {
        expect(actualOutputAction).toEqual(expectedOutputAction)
        done()
      })
    })
  })
})
