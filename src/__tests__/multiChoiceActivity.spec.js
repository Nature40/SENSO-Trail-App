import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/multiChoiceActivity.action.js'
import * as types from '../constants/multiChoiceActivity.constants.js'
import * as epics from '../epics/multiChoiceActivity.epics.js'
import reducer, { initialState } from '../reducers/multiChoiceActivity.reducer.js'

import {
  ACTIVITY_TYPE_MULTI_CHOICE,
  COMPLETE_ACTIVITY
} from '../constants/activity.constants.js'

/* eslint-env jest */

describe('multiChoiceActivity redux', () => {
  describe('actions', () => {
    it('should create an action to choose an answer', () => {
      const expectedAction = {
        type: types.CHOOSE_ANSWER,
        activityType: ACTIVITY_TYPE_MULTI_CHOICE,
        uuid: 'uuid1',
        answerId: '1'
      }

      expect(actions.chooseAnswer('uuid1', '1')).toEqual(expectedAction)
    })

    it('should create an action to reveal als Answers', () => {
      const expectedAction = {
        type: types.REVEAL_ANSWERS,
        activityType: ACTIVITY_TYPE_MULTI_CHOICE,
        uuid: 'uuid1'
      }

      expect(actions.revealAnswers('uuid1')).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle CHOOSE_ANSWER', () => {
      const state = {
        byUuid: {
          uuid1: {
            answers: {
              1: {}
            }
          },
          uuid2: {
            answers: {
              1: {}
            }
          }
        }
      }
      const action = {
        type: types.CHOOSE_ANSWER,
        activityType: ACTIVITY_TYPE_MULTI_CHOICE,
        uuid: 'uuid1',
        answerId: '1'
      }
      expect(reducer(state, action)).toEqual(
        {
          byUuid: {
            uuid1: {
              answers: {
                1: {
                  choosen: true
                }
              } 
            },
            uuid2: {
              answers: {
                1: {}
              }
            }   
          }
        }
      )
    })
    it('should handle REVEAL_ANSWERS', () => {
      const state = {
        byUuid: {
          uuid1: {},
          uuid2: {}
        }
      }
      const action = {
        type: types.REVEAL_ANSWERS,
        activityType: ACTIVITY_TYPE_MULTI_CHOICE,
        uuid: 'uuid1'
      }
      expect(reducer(state, action)).toEqual(
        {
          byUuid: {
            uuid1: {
              reveal: true
            },
            uuid2: {}
          }
        }
      )
    })
  })
  describe('epics', () => {
    it('should dispatch EMPTY when there are enough correct and wrong answers left to be choosen', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.CHOOSE_ANSWER,
          activityType: ACTIVITY_TYPE_MULTI_CHOICE,
          uuid: 'uuid1',
          answerId: '2'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          activity: {
            byUuid: {
              uuid1: {
                answers: {
                  1: {
                    id: '1',
                    correct: true
                  },
                  2: {
                    id: '2',
                    correct: false
                  },
                  3: {
                    id: '3',
                    correct: false
                  }
                }
              }
            }
          }
        }
      )
      const expectedOutputActions = [
      ]
      const res$ = epics.revealAnswersEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })

    it('should dispatch REVEAL_ANSWERES when there are no correct answers left, to be choosen', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.CHOOSE_ANSWER,
          activityType: ACTIVITY_TYPE_MULTI_CHOICE,
          uuid: 'uuid1',
          answerId: '1'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          activity: {
            byUuid: {
              uuid1: {
                points: 300,
                answers: {
                  1: {
                    id: '1',
                    correct: true
                  },
                  2: {
                    id: '2',
                    correct: false
                  },
                  3: {
                    id: '3',
                    correct: false
                  }
                }
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.REVEAL_ANSWERS,
          activityType: ACTIVITY_TYPE_MULTI_CHOICE,
          uuid: 'uuid1'
        },
        {
          type: COMPLETE_ACTIVITY,
          uuid: 'uuid1',
          points: 300
        }

      ]
      const res$ = epics.revealAnswersEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })

    it('should dispatch REVEAL_ANSWERES and COMPLETE_ACTIVITY when there are no wrong answers left, to be choosen', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.CHOOSE_ANSWER,
          activityType: ACTIVITY_TYPE_MULTI_CHOICE,
          uuid: 'uuid1',
          answerId: '2'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          activity: {
            byUuid: {
              uuid1: {
                answers: {
                  1: {
                    id: '1',
                    correct: true
                  },
                  2: {
                    id: '2',
                    correct: false
                  },
                  3: {
                    id: '3',
                    correct: false,
                    choosen: true
                  }
                }
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.REVEAL_ANSWERS,
          activityType: ACTIVITY_TYPE_MULTI_CHOICE,
          uuid: 'uuid1'
        },
        {
          type: COMPLETE_ACTIVITY,
          uuid: 'uuid1',
          points: 0
        }
      ]
      const res$ = epics.revealAnswersEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    /*
    it('should dispatch COMPLETE_ACTIVITY when answers are revealed', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.REVEAL_ANSWERS,
          activityType: ACTIVITY_TYPE_MULTI_CHOICE,
          uuid: 'uuid1'
        }
      )
      const expectedOutputActions = [
        {
          type: COMPLETE_ACTIVITY,
          uuid: 'uuid1',
          points: 0
        }
      ]
      const res$ = epics.completeMultiChoiceActivityEpic(action$, null).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    */
  })
})
