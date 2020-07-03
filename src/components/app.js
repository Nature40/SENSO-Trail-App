import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import NoMatch from './noMatch.js'
import ToolbarComponent from '../components/toolbar.component.js'
import Chat, { ChatButton } from '../containers/chat.container.js'

import Messages from '../containers/messages.container.js'

import Map from '../containers/map.container.js'

import '../styles/app.scss'
import '../styles/header.scss'

function dummyFrontPage (clearButton) {
  function test () {
      const routes = [
        '/assets/images/Saftfluss.jpg',
        '/assets/images/TreeTalker.jpg'
      ]
    window.navigator.serviceWorker.controller.postMessage({
      type: 'NATURE40_ADD_ROUTE',
      routes
    })
    Promise.all(routes.map(r => fetch(r)))
  }
  return (
    <div className='dummy_front_page'>
      <Link to='/chat'>GOTO Chat</Link>
      <Link to='/map'>GOTO Map</Link>
      <button onClick={test}> Test: Precache Saftfluss.jpg </button>
      {clearButton || ''}
    </div>
  )
}

function App ({ clearButton }) {
  return (
    <div className='App'>
      <header className='App-header'>
        <Link to='/'>SENSO-Trail App</Link>
        <nav className="nav">
          <Link to='/map' className="header__button header__button_map">Map</Link>
          <ChatButton />
        </nav>
        <Messages />
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={() => dummyFrontPage(clearButton)} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/map' component={Map} />
          <Route component={NoMatch} />
        </Switch>
      </main>
      <ToolbarComponent />
    </div>
  )
}

export default App
