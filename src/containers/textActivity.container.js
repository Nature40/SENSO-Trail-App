import { connect } from 'react-redux'

import TextActivityComponent from '../components/textActivity.js'

import { getActivity } from '../selectors/activity.selectors.js'

import { completeActivity } from '../actions/activity.action.js'

function mapStateToProps (state, props) {
  return {
    activity: getActivity(state, props)
  }
}

function mapDispatchTopProps (dispatch) {
  return {
    onReadText: (uuid, points) => dispatch(completeActivity(uuid, points)),
  }
}

const TextActivity = connect(
  mapStateToProps,
  mapDispatchTopProps
)(TextActivityComponent)

export default TextActivity
