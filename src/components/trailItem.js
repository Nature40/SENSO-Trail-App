import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import '../styles/trailItem.scss'

function TrailItem ({
  uuid,
  name,
  description,
  onStartTrail
}) {
  return (
    <li className='trail_item'>
      <header>
        <h2>{name}</h2>
      </header>
      <div className='trail_item__content'>
        <ReactMarkdown source={description} />
      </div>
      <div className='trail_item__toolbar'>
        <button onClick={(e) => onStartTrail(uuid)}>Trail Starten</button>
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
