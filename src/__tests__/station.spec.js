import { ActionsObservable, StateObservable } from 'redux-observable'
import { toArray } from 'rxjs/operators'
import { Subject } from 'rxjs'

import * as actions from '../actions/station.action.js'
import * as types from '../constants/station.constants.js'
import * as epics from '../epics/station.epics.js'
import reducer, { initialState } from '../reducers/station.reducer.js'

/* eslint-env jest */

describe('stations redux', () => {
  describe('actions', () => {
    it('should create an action to load the stations', () => {
      const expectedAction = {
        type: types.LOAD_STATION_START,
        uuids: ['uuid1', 'uuid2']
      }

      expect(actions.loadStations(['uuid1', 'uuid2'])).toEqual(expectedAction)
    })

    it('should create an action to successfull finsish loading stations', () => {
      const transformedStations = {
        'uuid1':{
          uuid: 'uuid1',
          slug: 'slug1'
        }
      }
      const slugToUuid = {
        'slug1': 'uuid1'
      }
      const expectedAction = {
        type: types.LOAD_STATION_SUCCESS,
        transformedStations,
        slugToUuid
      }

      expect(actions.loadStationsSuccess(transformedStations, slugToUuid)).toEqual(expectedAction)
    })

    it('should create an action to fail loading stations', () => {
      const expectedAction = {
        type: types.LOAD_STATION_FAIL
      }

      expect(actions.loadStationsFail()).toEqual(expectedAction)
    })

    it('should create an action to start completing a station', () => {
      const expectedAction = {
        type: types.UNLOCK_STATION_START,
        uuid: 'uuid1'
      }

      expect(actions.unlockStationStart('uuid1')).toEqual(expectedAction)
    })

    it('should create an action to fail completing a station', () => {
      const expectedAction = {
        type: types.UNLOCK_STATION_FAIL,
        uuid: 'uuid1'
      }

      expect(actions.unlockStationFail('uuid1')).toEqual(expectedAction)
    })

    it('should create an action to succeed completing a station', () => {
      const expectedAction = {
        type: types.UNLOCK_STATION_SUCCESS,
        uuid: 'uuid1'
      }

      expect(actions.unlockStationSuccess('uuid1')).toEqual(expectedAction)
    })
  })

  describe('reducer', () => {
    it('should return the initialState', () => {
      expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should handle LOAD_STATION_START', () => {
      const state = {
        loading: false,
        byUuid: {},
        slugToUuid: {}
      }
      const action = {
        type: types.LOAD_STATION_START
      }
      expect(reducer(state, action)).toEqual({
        loading: true,
        byUuid: {},
        slugToUuid: {}
      })
    })

    it('should handle LOAD_STATION_FAIL', () => {
      const state = {
        loading: false,
        byUuid: {},
        slugToUuid: {}
      }
      const action = {
        type: types.LOAD_STATION_FAIL
      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {},
        slugToUuid: {}
      })
    })

    it('override existing data on LOAD_STATION_SUCCESS', () => {
      const state = {
        loading: true,
        byUuid: {
          uuid1: {
            unlocked: true,
            slug: 'slug1'
          }
        },
        slugToUuid: {
          'slug1':'uuid1'
        }
      }
      const action = {
        type: types.LOAD_STATION_SUCCESS,
        transformedStations: {
          uuid1: {
            slug: 'slug1'
          }
        },
        slugToUuid: {
          'slug1':'uuid1'
        }

      }
      expect(reducer(state, action)).toEqual({
        loading: false,
        byUuid: {
          uuid1: {
            slug: 'slug1'
          }   
        },
        slugToUuid: {
          'slug1':'uuid1'
        }
      })
    })

    it('should handle UNLOCK_STATION_SUCCESS', () => {
      const state = {
        byUuid: {
          uuid1: {}
        }
      }
      const action = {
        type: types.UNLOCK_STATION_SUCCESS,
        uuid: 'uuid1'
      }
      expect(reducer(state, action)).toEqual({
        byUuid: {
          uuid1: { unlocked: true }
        }
      })
    })
  })

  describe('epics', () => {
    it('unlockStationEpic should dispatch UNLOCK_STATION_SUCCESS if all previous activities are completed', (done) => {
      const testStation = {
        uuid: 'uuid1',
        activities: ['a1', 'a2']
      }
      const testStation2 = {
        uuid: 'uuid2',
      }
      const action$ = ActionsObservable.of(
        {
          type: types.UNLOCK_STATION_START,
          uuid: 'uuid2'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {
            current_trail: 'trail',
            byUuid: {
              trail: {
                stations: [
                  'uuid1',
                  'uuid2'
                ]
              }
            }
          },
          station: {
            byUuid: {
              uuid1: {
                ...testStation
              },
              uuid2: {
                ...testStation2
              }
            }
          },
          activity: {
            byUuid: {
              a1: {
                uuid: 'a1',
                completed: true
              },
              a2: {
                uuid: 'a2',
                completed: true
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.UNLOCK_STATION_SUCCESS,
          uuid: 'uuid2'
        } 
      ]
      const res$ = epics.unlockStationEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('unlockStationEpic should dispatch UNLOCK_STATION_SUCCESS if it is the first station on the trail', (done) => {
      const testStation = {
        uuid: 'uuid1',
        activities: ['a1', 'a2']
      }
      const testStation2 = {
        uuid: 'uuid2',
      }
      const action$ = ActionsObservable.of(
        {
          type: types.UNLOCK_STATION_START,
          uuid: 'uuid1'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {
            current_trail: 'trail',
            byUuid: {
              trail: {
                stations: [
                  'uuid1',
                  'uuid2'
                ]
              }
            }
          },
          station: {
            byUuid: {
              uuid1: {
                ...testStation
              },
              uuid2: {
                ...testStation2
              }
            }
          },
          activity: {
            byUuid: {
              a1: {
                uuid: 'a1',
                completed: false
              },
              a2: {
                uuid: 'a2',
                completed: false
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.UNLOCK_STATION_SUCCESS,
          uuid: 'uuid1'
        } 
      ]
      const res$ = epics.unlockStationEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('unlockStationEpic should dispatch UNLOCK_STATION_FAIL if one or more previous activities are not completed', (done) => {
      const testStation = {
        uuid: 'uuid1',
        activities: ['a1', 'a2']
      }
      const testStation2 = {
        uuid: 'uuid2',
      }
      const action$ = ActionsObservable.of(
        {
          type: types.UNLOCK_STATION_START,
          uuid: 'uuid2'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {
            current_trail: 'trail',
            byUuid: {
              trail: {
                stations: [
                  'uuid1',
                  'uuid2'
                ]
              }
            }
          },
          station: {
            byUuid: {
              uuid1: {
                ...testStation
              },
              uuid2: {
                ...testStation2
              }
            }
          },
          activity: {
            byUuid: {
              a1: {
                uuid: 'a1',
                completed: false
              },
              a2: {
                uuid: 'a2',
                completed: true
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.UNLOCK_STATION_FAIL,
          uuid: 'uuid2'
        } 
      ]
      const res$ = epics.unlockStationEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('unlockStationEpic should dispatch UNLOCK_STATION_FAIL if Station is not in current Trail', (done) => {
      const testStation = {
        uuid: 'uuid1',
        activities: ['a1', 'a2']
      }
      const testStation2 = {
        uuid: 'uuid2',
      }
      const action$ = ActionsObservable.of(
        {
          type: types.UNLOCK_STATION_START,
          uuid: 'uuid2'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {
            current_trail: 'trail',
            byUuid: {
              trail: {
                stations: [
                  'uuid1',
                ]
              }
            }
          },
          station: {
            byUuid: {
              uuid1: {
                ...testStation
              },
              uuid2: {
                ...testStation2
              }
            }
          },
          activity: {
            byUuid: {
              a1: {
                uuid: 'a1',
                completed: true
              },
              a2: {
                uuid: 'a2',
                completed: true
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.UNLOCK_STATION_FAIL,
          uuid: 'uuid2'
        } 
      ]
      const res$ = epics.unlockStationEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('unlockStationEpic should dispatch UNLOCK_STATION_FAIL if current trail is undefined', (done) => {
      const testStation = {
        uuid: 'uuid1',
        activities: ['a1', 'a2']
      }
      const testStation2 = {
        uuid: 'uuid2',
      }
      const action$ = ActionsObservable.of(
        {
          type: types.UNLOCK_STATION_START,
          uuid: 'uuid2'
        }
      )
      const state$ = new StateObservable(
        new Subject(),
        {
          trails: {
            byUuid: {
              trail: {
                stations: [
                  'uuid1',
                ]
              }
            }
          },
          station: {
            byUuid: {
              uuid1: {
                ...testStation
              },
              uuid2: {
                ...testStation2
              }
            }
          },
          activity: {
            byUuid: {
              a1: {
                uuid: 'a1',
                completed: true
              },
              a2: {
                uuid: 'a2',
                completed: true
              }
            }
          }
        }
      )
      const expectedOutputActions = [
        {
          type: types.UNLOCK_STATION_FAIL,
          uuid: 'uuid2'
        } 
      ]
      const res$ = epics.unlockStationEpic(action$, state$).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should dispatch LOAD_STATION_SUCCESS when it loads correct data', (done) => {
      const testStation = {
        uuid: 'uuid1',
        slug: 'slug1'
      }
      const action$ = ActionsObservable.of(
        { type: types.LOAD_STATION_START }
      )
      const fetchJSON = (url) => new Promise((resolve) => { resolve([testStation]) })

      const expectedOutputActions = [
        {
          type: types.LOAD_STATION_SUCCESS,
          transformedStations: {
            uuid1: { ...testStation }
          },
          slugToUuid: {
            'slug1':'uuid1'
          }
        }
      ]
      const res$ = epics.loadStationsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
    it('should dispatch LOAD_STATION_FAIL when it does not load correct data', (done) => {
      const action$ = ActionsObservable.of(
        { type: types.LOAD_STATION_START }
      )
      const fetchJSON = (url) => new Promise((resolve, reject) => { reject() })

      const expectedOutputActions = [
        {
          type: types.LOAD_STATION_FAIL
        }
      ]
      const res$ = epics.loadStationsEpic(action$, null, { fetchJSON }).pipe(
        toArray()
      )
      res$.subscribe(actualOutputActions => {
        expect(actualOutputActions).toEqual(expectedOutputActions)
        done()
      })
    })
  })
})
