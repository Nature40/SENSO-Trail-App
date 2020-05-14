import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import { checkBounds } from '../utils/geo/checkBounds.js'


export default function Map (props) {
  const iFrame = useRef(null)

  // Similar to componentDidMount and componentDidUpdate:  
  useEffect(() => {    
    function onLoad () {
          console.log("iframe loaded")
          iFrame.current.loaded = true;
          interactWithIframe(iFrame, props);
    }

    if(iFrame.current.loaded){
      interactWithIframe(iFrame, props);
    } else {
      iFrame.current.addEventListener('load', onLoad)
    }
  });
  return (
    <div>
      <iframe 
        ref={iFrame}
        id="mapIframe"
        title="Map Iframe"
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

function interactWithIframe(iFrame, props) {

  const {latitude, longitude} = props

  if(checkBounds(latitude, longitude)) {
    if('setPositionMarker' in iFrame.current.contentWindow) {
      console.log("SET POSITION")
      iFrame.current.contentWindow.setPositionMarker(latitude, longitude)

    }
  }   
}
