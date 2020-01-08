import React from 'react';
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

export default function StationInfo ({station, onUnlockStation}) {
  return (
    <div className='card info_card'>
      <header>
        <h2>{station.name}</h2>
      </header>
      <div className='info_card__content'>
        <ReactMarkdown source={station.description} />
      </div>
      <div>
        <button onClick={() => onUnlockStation(station.uuid)}>UNLOCK</button>
      </div>
    </div>
  )
}

StationInfo.propTypes = {
  station: PropTypes.shape({
    uuid: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
    activities: PropTypes.array
  }).isRequired
}
