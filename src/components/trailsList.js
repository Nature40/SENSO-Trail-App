import React from 'react'
import PropTypes from 'prop-types'

import TrailItem from './trailItem.js'
import Dialog from './dialog.js'

import '../styles/trailList.css'

const TrailsList = ({ trails, onStartTrail }) => {
  const dialogToolbar = [
    (<button key='c'>Cancel</button>),
    (<button key='o'>OK</button>)
  ]
  return (
    <section className='page--trails_list'>
      <Dialog title='test' open tools={dialogToolbar}>
        <p>Hallo Welt</p>
      </Dialog>
      <ul className='trails_list'>
        {trails.map(
          (trail) =>
            <TrailItem
              key={trail.uuid}
              onStartTrail={onStartTrail}
              {...trail}
            />
        )}
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
  ),
  onStartTrail: PropTypes.func
}

export default TrailsList
