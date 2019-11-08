import React from 'react'
import PropTypes from 'prop-types'

import '../styles/trailItem.scss'

function TrailItem ({ uuid, name, description }) {
  return (
    <li className='trail_item'>
      <header>
        <h3>{name}</h3>
      </header>
      <div className='trail_item__content'>
        <p>{description}</p>
      </div>
      <div className="trail_item__toolbar">
        <button>Trail Starten</button>
      </div>
    </li>
  )
}

TrailItem.propTypes = {
  uuid: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string
}

export default TrailItem
