import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import Activity from '../containers/activityWrapper.container.js'

import '../styles/stationView.scss'

export default function StationView ({
  station,
  onCompleteStation
}) {
  return (
    <div className='box station'>
      <header>
        <h2>{station.name}</h2>
      </header>
      <div className='box__content station__description'>
        <ReactMarkdown source={station.description} />
      </div>
      <div className='box__content station__activities'>
        {
          station.activities
            ? station.activities.map(uuid => <Activity key={uuid} uuid={uuid} />)
            : ''
        }
      </div>
      <footer className='box__toolbar'>
        <button onClick={() => onCompleteStation(station.uuid)}>Zur nächsten Station</button>
      </footer>
    </div>
  )
}

StationView.propTypes = {
  station: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    activities: PropTypes.array
  }).isRequired
}
