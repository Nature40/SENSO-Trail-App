import { changeLocation, locationError } from '../../actions/geolocation.actions.js'

function isAvailable(){
  console.log('Geolocation available:', 'geolocation' in window.navigator)
  return 'geolocation' in window.navigator
}

let watcher = undefined

function init(dispatch){
  if(watcher){
    console.error('A watcher is already defined')
  }

  function onLocationChanged(geolocationPosition) {
    console.log('onLocationChanged:')
    dispatch(changeLocation(
      geolocationPosition.coords.latitude,
      geolocationPosition.coords.longitude,
    ))
  }

  function onLocationError(error) {
    dispatch(locationError(error))
    clear()
  }
  if(isAvailable()){
    watcher = navigator.geolocation.watchPosition(onLocationChanged, onLocationError)
  }
}


function clear(){
  navigator.geolocation.clearWatch(watcher)
  watcher = undefined
}

export default {
  init,
  clear,
  isAvailable
}
