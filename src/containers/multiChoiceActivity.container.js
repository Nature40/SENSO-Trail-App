import { connect } from 'react-redux'

import MultiChoiceActivityComponent from '../components/multiChoiceActivity.js'

import { getActivity } from '../selectors/activity.selectors.js'

function mapStateToProps (state, props) {
  return {
    activity: getActivity(state, props)
  }
}

function mapDispatchTopProps (dispatch) {
  return {
  }
}

const MultiChoiceActivity = connect(
  mapStateToProps,
  mapDispatchTopProps
)(MultiChoiceActivityComponent)

export default MultiChoiceActivity
