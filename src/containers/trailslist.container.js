import { connect } from 'react-redux'
import TrailsList from '../components/trailsList.js'
import { getTrailsList } from '../selectors/trails.selectors.js'
import { startTrail, cancelStartTrail, acceptStartTrail } from '../actions/trails.action.js'
import { loadStations } from '../actions/station.action.js'

const mapStateToProps = state => {
  return {
    trails: getTrailsList(state),
    error: (state.trails.error !== undefined ? {
      currentTrail: state.trails.byUuid[state.trails.current_trail],
      selectedTrail: state.trails.byUuid[state.trails.error.selected_trail]
    } : undefined)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onStartTrail: (uuid) => dispatch(startTrail(uuid)),
    onStartTrailCancel: () => dispatch(cancelStartTrail()),
    onStartTrailAccept: (uuid) => dispatch(acceptStartTrail(uuid)),
    onLoadStations: (stations) => dispatch(loadStations(stations))
  }
}

const TrailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailsList)

export default TrailsListContainer
