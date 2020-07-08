
import React from 'react'

import '../styles/dev.scss'

export default function DevView ({position, stations, state}) {
  console.log(state)
  return (
    <div className="dev">
      <div className="position">
        <div className="dev__label">Position</div>
        <div className="dev__data">{position.lat} , {position.long}</div>
      </div>
      <div className="dev--stations">
        <div className="dev__label">Stations</div>
        <div className="dev__data">
          {stations.map(s => {
            return (
              <div className="station">
              <strong>{s.station}:</strong> {s.latitude}, {s.longitude}
              </div>)
          }) }
        </div>
      </div>

      <div className="state">
        <div className="dev__label">State Data</div>
        <div className="dev__data">
          <pre>
            {state}
          </pre>
        </div>
      </div>
    </div>
  )
}

