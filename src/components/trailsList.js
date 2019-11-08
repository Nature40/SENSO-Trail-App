import React from 'react'
import PropTypes from 'prop-types'

const TrailsList = ({ trails }) => {
  return (
    <section className='page--trails_list'>
      <ul className='trails_list'>
        {trails.map((trail) => <li key={trail.uuid}>{trail.name}</li>)}
      </ul>
    </section>
  )
}

TrailsList.propTypes = {
  trails: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      uuid: PropTypes.string
    })
  )
}

export default TrailsList
