import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/activity.action.js'
import * as types from '../constants/activity.constants.js'
import * as epics from '../epics/imageActivity.epic.js'
import reducer, { initialState } from '../reducers/activity.reducer.js'

/* eslint-env jest */

describe('image activity redux', () => {
  describe('epics', () => {
    it('should dispatch LOAD_RESOURCE_START when activities finished loading and a ACTIVITY_TYPE_IMAGE is among them', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.LOAD_ACTIVITIES_SUCCESS,
          transformedActivities: {
            acti1: {
              uuid: 'acti1',
              activityType: types.ACTIVITY_TYPE_IMAGE,
              image: {
                src: '1.jpg'
              },
              slug: 'acti1'
            },
            acti2: {
              uuid: 'acti2',
              activityType: types.ACTIVITY_TYPE_IMAGE,
              image: {
                src: '2.jpg'
              },
              slug: 'acti2'
            }
          },
          slugToUuid: {
            acti1: 'acti1',
            acti2: 'acti2'
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.LOAD_RESOURCE_START,
          uuids: ['acti1', 'acti2'],
          resourceUrls: ['1.jpg', '2.jpg']
        }
      ]
      const res$ = epics.detectImageResourceEpic(action$, null).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should not dispatch anything when activities finished loading and no ACTIVITY_TYPE_IMAGE is among them', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.LOAD_ACTIVITIES_SUCCESS,
          transformedActivities: {
            acti1: {
              uuid: 'acti1',
              activityType: types.ACTIVITY_TYPE_TEXT,
              slug: 'acti1'
            },
            acti2: {
              uuid: 'acti2',
              activityType: types.ACTIVITY_TYPE_IMAGE,
              image: {
                src: '2.jpg'
              },
              slug: 'acti2'
            }
          },
          slugToUuid: {
            acti1: 'acti1',
            acti2: 'acti2',
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.LOAD_RESOURCE_START,
          uuids: ['acti2'],
          resourceUrls: ['2.jpg']
        }
      ]
      const res$ = epics.detectImageResourceEpic(action$, null).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should only add urls of ACTIVITY_TYPE_IMAGE to the LOAC_RESOURCE_START action', (done) => {
      const action$ = ActionsObservable.of(
        {
          type: types.LOAD_ACTIVITIES_SUCCESS,
          transformedActivities: {
            acti1: {
              uuid: 'acti1',
              activityType: types.ACTIVITY_TYPE_TEXT,
              slug: 'acti1'
            }
          },
          slugToUuid: {
            acti1: 'acti1',
          }
        }
      )
      const expectedOutputActions = [
      ]
      const res$ = epics.detectImageResourceEpic(action$, null).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
