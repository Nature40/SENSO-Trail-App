import { connect } from 'react-redux'
import TrailsList from '../components/trailsList.js'
import { getTrailsList } from '../selectors/trails.selectors.js'
import { startTrail } from '../actions/trails.action.js'

const mapStateToProps = state => {
  return {
    trails: getTrailsList(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartTrail: (uuid) => dispatch(startTrail(uuid))
  }
}

const TrailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailsList)

export default TrailsListContainer
