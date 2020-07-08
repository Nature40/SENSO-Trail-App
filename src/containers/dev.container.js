import { connect } from 'react-redux'

import DevView from '../components/dev.view.js'

import {getCurrentPosition} from '../selectors/geo.selector.js'
import {getStations} from '../selectors/dev.selector.js'

const mapStateToProps = state => {
  return {
    position: getCurrentPosition(state),
    stations: getStations(state),
    state: JSON.stringify(state, null, '  ')
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

const Dev = connect(
  mapStateToProps,
  mapDispatchToProps
)(DevView)

export default Dev
