import React from 'react'
import { Route, Switch } from 'react-router'
import '../styles/app.css'
import NoMatch from './noMatch.js'

function App () {
  return (
    <div className='App'>
      <header className='App-header'>
        <p>SENSO-Trail App</p>
      </header>
      <main>
        <Switch>
          <Route exact path='/' render={() => <div>HALLO WELT</div>} />
          <Route component={NoMatch} />
        </Switch>
      </main>
    </div>
  )
}

export default App
