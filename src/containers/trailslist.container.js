import { connect } from 'react-redux'
import TrailsList from '../components/trailsList.js'
import { getTrailsList } from '../selectors/trails.selectors.js'

const mapStateToProps = state => {
  return {
    trails: getTrailsList(state)
  }
}

const mapDispatchToProps = state => {
  return {

  }
}

const TrailsListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrailsList)

export default TrailsListContainer
