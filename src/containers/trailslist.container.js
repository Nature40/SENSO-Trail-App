import { connect } from 'react-redux'
import TrailsList from '../components/trailsList.js'
import { getTrailsList } from '../selectors/trails.selectors.js'
import { startTrail, cancelStartTrail, acceptStartTrail } from '../actions/trails.action.js'

const mapStateToProps = state => {
  return {
    trails: getTrailsList(state),
    error: state.trails.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartTrail: (uuid) => dispatch(startTrail(uuid)),
    onStartTrailCancel: () => dispatch(cancelStartTrail()),
    onStartTrailAccept: (uuid) => dispatch(acceptStartTrail(uuid))
  }
}

const TrailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailsList)

export default TrailsListContainer
