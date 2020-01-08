import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import '../styles/app.scss'
import NoMatch from './noMatch.js'
import TrailsListContainer from '../containers/trailslist.container.js'
import CurrentTrail from '../containers/currentTrail.container.js'
import ToolbarComponent from '../components/toolbar.component.js'

function dummyFrontPage (clearButton) {
  return (
    <div className='dummy_front_page'>
      <Link to='/trails'>GOTO Trails</Link>
      <Link to='/mytrail'>GOTO Current Trail</Link>
      {clearButton || ''}
    </div>
  )
}

function App ({ clearButton }) {
  return (
    <div className='App'>
      <header className='App-header'>
        <Link to='/'>SENSO-Trail App</Link>
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={() => dummyFrontPage(clearButton)} />
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
