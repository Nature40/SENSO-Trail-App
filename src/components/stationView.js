import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import '../styles/stationView.scss'

export default function StationView ({
  name,
  description
}) {
  return (
    <div className='box station'>
      <header>
        <h2>{name}</h2>
      </header>
      <div className='box__content station__description'>
        <ReactMarkdown source={description} />
      </div>
      <div className='box__content station__actions'>
        @TODO Aktionen
      </div>
      <footer className='box__toolbar'>
        <button>Weiter</button>
      </footer>
    </div>
  )
}

StationView.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string
}
