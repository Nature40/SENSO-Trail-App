import React from 'react'
import PropTypes from 'prop-types'

import '../styles/score.scss'

export function ScoreCounter ({ score, isActive }) {
  if (!isActive) {
    return ''
  }
  return (
    <div className='score'>
      <strong>Score:</strong> <span className='score-value'>{score}</span>
    </div>
  )
}

export default ScoreCounter

ScoreCounter.propTypes = {
  score: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired
}
