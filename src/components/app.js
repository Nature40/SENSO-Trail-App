import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import '../styles/app.scss'
import NoMatch from './noMatch.js'
import TrailsListContainer from '../containers/trailslist.container.js'
import CurrentTrail from '../containers/currentTrail.container.js'
import ToolbarComponent from '../components/toolbar.component.js'
import Chat from '../containers/chat.container.js'

import ScoreCounter from '../containers/scoreCounter.container.js'

import Messages from '../containers/messages.container.js'

import Map from './mapIframe.view.js'

function dummyFrontPage (clearButton) {
  return (
    <div className='dummy_front_page'>
      <Link to='/trails'>GOTO Trails</Link>
      <Link to='/mytrail'>GOTO Current Trail</Link>
      <Link to='/chat'>GOTO Chat</Link>
      <Link to='/map'>GOTO Map</Link>
      {clearButton || ''}
    </div>
  )
}

function App ({ clearButton }) {
  return (
    <div className='App'>
      <header className='App-header'>
        <Link to='/'>SENSO-Trail App</Link>
        <ScoreCounter />
        <Messages />
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={() => dummyFrontPage(clearButton)} />
          <Route exact path='/chat' component={Chat} />
          <Route exact path='/map' component={Map} />
          <Route exact path='/trails' component={TrailsListContainer} />
          <Route path='/mytrail' component={CurrentTrail} />
          <Route component={NoMatch} />
        </Switch>
      </main>
      <ToolbarComponent />
    </div>
  )
}

export default App
