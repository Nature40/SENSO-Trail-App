import React from 'react';
import { Route, Switch } from 'react-router'
import { Link } from 'react-router-dom'
import { CurrentTrailToolbar } from '../containers/currentTrail.container.js'

export default function ToolbarComponent () {
  return (
    <Switch>
      <Route exact path='/trails'>
        <div className="toolbar">
          <Link to='/mytrail'>GOTO Current Trail</Link>
        </div>
      </Route>
      <Route path='/mytrail/:stationSlug/:activitySlug' component={CurrentTrailToolbar} />
      <Route path='/mytrail/:stationSlug' component={CurrentTrailToolbar} />
      <Route path='/mytrail' component={CurrentTrailToolbar} />
      <Route>
        <div className="empty-toolbar"/>
      </Route>
    </Switch>
  )
}
