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

store.dispatch(loadTrails())

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
if (process.env && process.env.NODE_ENV === 'production') {
  console.log('prod env')
  serviceWorker.register()
} else {
  serviceWorker.unregister()
}
