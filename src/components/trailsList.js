import React from 'react'
import PropTypes from 'prop-types'

import TrailItem from './trailItem.js'
import Dialog from './dialog.js'

import '../styles/trailList.css'

const TrailsList = ({
  trails,
  error,
  onStartTrail,
  onStartTrailAccept,
  onStartTrailCancel
}) => {
  const dialogToolbar = [
    (<button key='c' onClick={onStartTrailCancel}>Abbrechen</button>),
    (<button key='o' onClick={() => onStartTrailAccept(error.selected_trail)}>Neuen Trail Starten</button>)
  ]
  return (
    <section className='page--trails_list'>
      <Dialog title='Achtung' open={error !== undefined} tools={dialogToolbar}>
        <p>Es wurde bereits ein Trail gestartet.</p>
        <p>Willst du wirklich einen neuen Trail starten</p>
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
  error: PropTypes.object,
  onStartTrail: PropTypes.func,
  onStartTrailAccept: PropTypes.func,
  onStartTrailCancel: PropTypes.func
}

export default TrailsList
