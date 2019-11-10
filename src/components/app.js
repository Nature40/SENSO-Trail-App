import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import '../styles/app.scss'
import NoMatch from './noMatch.js'
import TrailsListContainer from '../containers/trailslist.container.js'
import CurrentTrail from '../containers/currentTrail.container.js'

function dummyFrontPage () {
  return (
    <div className='dummy_front_page'>
      <Link to='/trails'>GOTO Trails</Link>
      <Link to='/mytrail'>GOTO Current Trail</Link>
    </div>
  )
}

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>SENSO-Trail App</p>
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={dummyFrontPage} />
          <Route exact path='/trails' component={TrailsListContainer} />
          <Route exact path='/mytrail' component={CurrentTrail} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  )
}

export default App
