import { connect } from 'react-redux'
import TrailView from '../components/trailView.js'
import { getCurrentTrail, getCurrentTrailsStations } from '../selectors/trails.selectors.js'

function mapStateToProps (state) {
  return {
    trail: getCurrentTrail(state),
    stations: getCurrentTrailsStations(state)
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

const CurrentTrail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailView)

export default CurrentTrail
