import React from 'react';
import { Route, Switch } from 'react-router'
import { ChatToolbar } from '../containers/chat.container.js'

export default function ToolbarComponent () {
  return (
    <Switch>
      <Route path='/chat' component={ChatToolbar} />
      <Route>
        <div className="empty-toolbar"/>
      </Route>
    </Switch>
  )
}
