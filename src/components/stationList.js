import React from 'react'
import PropTypes from 'prop-types'
import StationView from './stationView.js'

import '../styles/stationList.scss'

export default function StationList ({ stations }) {
  let stationViews
  if (stations.length > 0) {
    stationViews = stations.map((station) => {
      return (
        <li key={station.uuid}>
          <StationView {...station} />
        </li>
      )
    })
  } else {
    stationViews = <p>Keine Stationen geladen</p>
  }
  return (
    <ul className='station_list no_list_style'>
      {stationViews}
    </ul>
  )
}

StationList.propTypes = {
  stations: PropTypes.arrayOf(PropTypes.object)
}
