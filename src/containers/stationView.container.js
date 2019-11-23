import { connect } from 'react-redux'

import StationViewComponent from '../components/stationView.js'

import { getStation } from '../selectors/station.selectors.js'

import { completeStationStart } from '../actions/station.action.js'

function mapStateToProps (state, props) {
  return {
    station: getStation(state, props),
    ...props
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onCompleteStation: (uuid) => dispatch(completeStationStart(uuid))
  }
}

const StationView = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationViewComponent)

export default StationView
