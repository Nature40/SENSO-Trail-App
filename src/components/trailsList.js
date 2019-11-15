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
  onStartTrailCancel,
  onLoadStations
}) => {
  let errorDialog = ''
  if (error !== undefined) {
    const dialogToolbar = [
      (
        <button
          key='c'
          onClick={onStartTrailCancel}
        >
          Abbrechen
        </button>),
      (
        <button
          key='o'
          onClick={() => onStartTrailAccept(error.selectedTrail.uuid)}
        >
        Trail {error.selectedTrail.name} Starten
        </button>)
    ]
    errorDialog = (
      <Dialog title='Achtung' open={error !== undefined} tools={dialogToolbar}>
        <p>Der Trail {error.currentTrail.name} läuft bereits</p>
        <p>Willst du wirklich einen neuen Trail starten</p>
      </Dialog>
    )
  }
  return (
    <section className='page--trails_list'>
      {errorDialog}
      <ul className='trails_list no_list_style'>
        {trails.map(
          (trail) =>
            <TrailItem
              key={trail.uuid}
              onStartTrail={onStartTrail}
              onLoadStations={onLoadStations}
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
  onStartTrailCancel: PropTypes.func,
  onLoadStations: PropTypes.func
}

export default TrailsList
