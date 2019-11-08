import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer, { initialState } from './reducers/root.reducer.js'

export const history = createBrowserHistory()

export default function configureStore (preloadedState = initialState) {
  const store = createStore(
    createRootReducer(history),
    preloadedState,
    compose(
      applyMiddleware(
        routerMiddleware(history)
      )
    )
  )

  return store
}
