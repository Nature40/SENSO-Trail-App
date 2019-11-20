import { connect } from 'react-redux'

import MultiChoiceActivityComponent from '../components/multiChoiceActivity.js'

import { chooseAnswer } from '../actions/multiChoiceActivity.action.js'

import { getActivity } from '../selectors/activity.selectors.js'

function mapStateToProps (state, props) {
  return {
    activity: getActivity(state, props)
  }
}

function mapDispatchTopProps (dispatch) {
  return {
    onChooseAnswer: (uuid, answerId) => dispatch(chooseAnswer(uuid, answerId))
  }
}

const MultiChoiceActivity = connect(
  mapStateToProps,
  mapDispatchTopProps
)(MultiChoiceActivityComponent)

export default MultiChoiceActivity
