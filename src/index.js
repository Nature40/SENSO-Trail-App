import _POLYFILL from './utils/polyfills/index.js'

import React from 'react'
import ReactDOM from 'react-dom'


import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore, { history } from './createStore.js'
import './styles/index.scss'
import App from './components/app.js'
import * as serviceWorker from './serviceWorker'

// For now only. Needs to be some sort of init action later
import { loadTrails } from './actions/trails.action.js'

const { store, persistor } = configureStore()

function clearCaches () {
  console.log('START CLEARING')
  Promise.all([
    window.caches.keys()
      .then((names) => {
        for (const name of names) {
          window.caches.delete(name)
        }
      })
      .then(() => { console.log('Service Worker cleared') }),
    persistor.purge().then(() => {
      console.log('Persist store cleared')
    })
  ]).then(() => {
    console.log('all caches cleared')
    window.location.reload()
  })
}

store.dispatch(loadTrails())

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env && process.env.NODE_ENV === 'production') {
  const clearCachesButton = (
    <button onClick={clearCaches}>Clear Caches</button>
  )
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} basename={process.env.PUBLIC_URL}>
        <PersistGate loading={null} persistor={persistor}>
          <App clearButton={clearCachesButton} />
        </PersistGate>
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'))
  console.log('prod env')
  serviceWorker.register()
} else {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} basename={process.env.PUBLIC_URL}>
        <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'))
  serviceWorker.unregister()
}
