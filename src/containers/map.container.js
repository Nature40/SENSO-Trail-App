import { connect } from 'react-redux'

import MapView from '../components/mapIframe.view.js'

import {
  getCurrentLatitude,
  getCurrentLongitude
} from '../selectors/geo.selector.js'

const mapStateToProps = state => {
  return {
    latitude: getCurrentLatitude(state),
    longitude: getCurrentLongitude(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const Map = connect(
  mapStateToProps,
  mapDispatchToProps
)(MapView)

export default Map
