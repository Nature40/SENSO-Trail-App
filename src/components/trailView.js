import React from 'react'
import PropTypes from 'prop-types'
import { useRouteMatch } from 'react-router-dom'
import { Redirect, Route, Switch } from 'react-router'
import ReactMarkdown from 'react-markdown'
import StationView from '../containers/stationView.container.js'
import ActivityWrapper from '../containers/activityWrapper.container.js'

import '../styles/trailView.scss'

export default function TrailView ({ trail, currentStation }) {
  let { path } = useRouteMatch();
  if (trail === undefined) {
    return <Redirect to='/trails' />
  }
  return (
    <div className='trail_view'>
      <section className='trail_view__content'>
        <Switch>
          <Route exact path={path}>
            <TrailInfoView {...trail} />
          </Route>
          <Route path={`${path}/:stationSlug/:activitySlug`} component={ActivityWrapper} />
          <Route path={`${path}/:stationSlug`} component={StationView} />
        </Switch>
      </section>
    </div>
  )
}

function TrailInfoView ( {name, description} ) {
  return (
    <li className='card info_card'>
      <header>
        <h2>{name}</h2>
      </header>
      <div className='info_card__content'>
        <ReactMarkdown source={description} />
      </div>
    </li>
  )
}


TrailView.propTypes = {
  trail: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    uuid: PropTypes.string,
    stations: PropTypes.arrayOf(PropTypes.string)
  })
}
