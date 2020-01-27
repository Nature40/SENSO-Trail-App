import { connect } from 'react-redux'
import TrailView from '../components/trailView.js'
import TrailTool from '../components/trailToolbar.component.js'
import { getCurrentTrail } from '../selectors/trails.selectors.js'
import { getPath } from '../selectors/path.selectors.js'

function mapStateToProps (state) {
  return {
    trail: getCurrentTrail(state),
    currentStation: state.trails.currentStation
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export const CurrentTrail = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailView)

function mapStateToToolbarProps (state) {
  return {
    trail: getCurrentTrail(state), 
    path: getPath(state)
  }
}

export const CurrentTrailToolbar = connect(
  mapStateToToolbarProps,
  mapDispatchToProps,
)(TrailTool)

export default CurrentTrail
