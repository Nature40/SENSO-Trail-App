import { connect } from 'react-redux'

import ScoreCounterComponent from '../components/scoreCounter.js'

import { getCurrentTrail } from '../selectors/trails.selectors.js'

function mapStateToProps (state) {
  return {
    score: state.score.score,
    isActive: getCurrentTrail(state) !== undefined
  }
}

function mapDispatchToProps (dispatch) {
  return {}
}

export const ScoreCounter = connect(
  mapStateToProps,
  mapDispatchToProps
)(ScoreCounterComponent)

export default ScoreCounter
