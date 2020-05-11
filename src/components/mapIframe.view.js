import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import { checkBounds } from '../utils/geo/checkBounds.js'


export default function Map ({latitude, longitude}) {
  const iFrame = useRef(null)

  // Similar to componentDidMount and componentDidUpdate:  
  useEffect(() => {    
    if(checkBounds(latitude, longitude)) {
      console.log("IFRAME: ", iFrame)
      if('setPositionMarker' in iFrame.current.contentWindow) {
        console.log("SET POSITION")
        iFrame.current.contentWindow.setPositionMarker(latitude, longitude)
      }
    }   
  });
  return (
    <div>
      <iframe 
        ref={iFrame}
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="1000"
        height="1000"
        src="./assets/map/index.html">
      </iframe>
    </div>
  )
}

Map.propTypes = {
  latitude: PropTypes.number,
  longitude: PropTypes.number,
}
