import { connect } from 'react-redux'

import StationInfoComponent from '../components/stationInfo.js'

import { getStationBySlug } from '../selectors/station.selectors.js'

import { unlockStationStart } from '../actions/station.action.js'

function mapStateToProps (state, props) {
  return {
    station: getStationBySlug(state, {slug: props.match.params.stationSlug}),
    ...props
  }
}

function mapDispatchToProps (dispatch) {
  return {
    onUnlockStation: (uuid) => dispatch(unlockStationStart(uuid))
  }
}

const StationView = connect(
  mapStateToProps,
  mapDispatchToProps
)(StationInfoComponent)

export default StationView
