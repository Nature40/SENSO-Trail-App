import React from 'react'
import PropTypes from 'prop-types'

import TrailItem from './trailItem.js'

import '../styles/trailList.css'

const TrailsList = ({ trails }) => {
  return (
    <section className='page--trails_list'>
      <ul className='trails_list'>
        {trails.map((trail) => <TrailItem key={trail.uuid} {...trail} />)}
      </ul>
    </section>
  )
}

TrailsList.propTypes = {
  trails: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      uuid: PropTypes.string
    })
  )
}

export default TrailsList
