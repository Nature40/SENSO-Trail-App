import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import '../styles/trailItem.scss'

function TrailItem ({
  uuid,
  name,
  stations,
  description,
  onStartTrail,
  onLoadStations
}) {
  return (
    <li className='trail_item card info_card'>
      <header>
        <h2>{name}</h2>
      </header>
      <div className='info_card__content'>
        <ReactMarkdown source={description} />
      </div>
      <div className='trail_item__toolbar'>
        <button onClick={(e) => onStartTrail(uuid)}>Trail Starten</button>
        <button onClick={(e) => onLoadStations(stations)}>Stationen herunterladen</button>
      </div>
    </li>
  )
}

TrailItem.propTypes = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  onStartTrail: PropTypes.func
}

export default TrailItem
