import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import createRootReducer, { initialState } from './reducers/root.reducer.js'
import rootEpic, { configureEpicMiddleware } from './epics/root.epic.js'

export const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL
})

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function configureStore (preloadedState = initialState) {

  const epicMiddleware = configureEpicMiddleware()

  const middlewares = [
    epicMiddleware,
    routerMiddleware(history)
  ]

  const store = createStore(
    createRootReducer(history),
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  )

  epicMiddleware.run(rootEpic)

  return store
}
