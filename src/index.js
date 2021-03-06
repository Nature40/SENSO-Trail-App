 // eslint-disable-next-line 
import _POLYFILL from './utils/polyfills/index.js'

import React from 'react'
import ReactDOM from 'react-dom'

import { init as initConfig } from './utils/config.js';

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { PersistGate } from 'redux-persist/integration/react'

import configureStore, { history } from './createStore.js'
import './styles/index.scss'
import App from './components/app.js'

import GeolocationEmitter from './utils/geo/geolocationEmitter.js'

import getNotificationPermission from './utils/notification/getPermission.js'

import * as serviceWorker from './serviceWorker'

// For now only. Needs to be some sort of init action later
import { loadInkJsonStart } from './actions/chat.actions.js'
import { setSwActive } from './actions/resources.actions.js'
import { setNotificationPermission } from './actions/notification.actions.js'
// import { loadResource } from './actions/resources.actions.js'

const { store, persistor } = configureStore()

const config = initConfig(process.env.PUBLIC_URL);

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


GeolocationEmitter.init(store.dispatch)
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
  serviceWorker.register({},() => {
    store.dispatch(setSwActive())
    store.dispatch(loadInkJsonStart(`${config.sources.trail}${config.trailname}.json`))
  })

} else {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history} basename={process.env.PUBLIC_URL}>
        <App />
      </ConnectedRouter>
    </Provider>
    , document.getElementById('root'))
  serviceWorker.unregister()

  getNotificationPermission().then((notificationAllowed) => {
    store.dispatch(setNotificationPermission(notificationAllowed))
    store.dispatch(loadInkJsonStart(`${config.sources.trail}${config.trailname}.json`))
  })
}
