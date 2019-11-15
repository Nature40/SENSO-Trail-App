import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import StationList from './stationList.js'

import '../styles/trailView.scss'

export default function TrailView ({ trail, stations }) {
  console.log(trail)
  if (trail === undefined) {
    return <Redirect to='/trails' />
  }
  return (
    <div className='trail_view'>
      <header className='trail_view__header'>
        <h1>{trail.name}</h1>
      </header>
      <section className='trail_view__stations'>
        <StationList stations={stations} />
      </section>
    </div>
  )
}

TrailView.propTypes = {
  trail: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    uuid: PropTypes.string
  })
}
