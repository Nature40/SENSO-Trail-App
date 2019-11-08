import React from 'react'
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import '../styles/app.scss'
import NoMatch from './noMatch.js'
import TrailsListContainer from '../containers/trailslist.container.js'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>SENSO-Trail App</p>
      </header>
      <main>
        <Switch>
    <Route exact path='/' render={() => <div>HALLO WELT <Link to="/trails" >GOTO Trails</Link></div>} />
          <Route exact path='/trails' component={TrailsListContainer} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  )
}

export default App
