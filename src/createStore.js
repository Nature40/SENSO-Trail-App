import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import createRootReducer, { initialState } from './reducers/root.reducer.js'
import rootEpic, { configureEpicMiddleware } from './epics/root.epic.js'

export const history = createBrowserHistory()

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

export default function configureStore (preloadedState = initialState) {

  let rootReducer, persistor

  if (process.env && process.env.NODE_ENV === 'production') {
    const persistConfig = {
      key: 'root',
      storage,
      blacklist: ['router']
    }

    rootReducer = persistReducer(persistConfig, createRootReducer(history))
  } else {
    rootReducer = createRootReducer(history)
  }

  const epicMiddleware = configureEpicMiddleware()

  const middlewares = [
    epicMiddleware,
    routerMiddleware(history)
  ]

  const store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  epicMiddleware.run(rootEpic)

  if (process.env && process.env.NODE_ENV === 'production') {
    persistor = persistStore(store)
  }

  return { store, persistor }
}
