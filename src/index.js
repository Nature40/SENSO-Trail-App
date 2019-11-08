import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './createStore.js'
import './styles/index.css'
import App from './components/app.js'
import * as serviceWorker from './serviceWorker'

// For now only. Needs to be some sort of init action later
import { loadTrails } from './actions/trails.action.js'

const store = configureStore()

store.dispatch(loadTrails())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
