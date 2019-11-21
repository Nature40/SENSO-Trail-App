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
  const persistConfig = {
    key: 'root',
    storage
  }

  const persistedReducer = persistReducer(persistConfig, createRootReducer(history))

  const epicMiddleware = configureEpicMiddleware()

  const middlewares = [
    epicMiddleware,
    routerMiddleware(history)
  ]

  const store = createStore(
    persistedReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  epicMiddleware.run(rootEpic)

  const persistor = persistStore(store)

  return { store, persistor }
}
