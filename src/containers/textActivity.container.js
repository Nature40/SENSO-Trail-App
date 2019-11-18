import { connect } from 'react-redux'

import TextActivityComponent from '../components/textActivity.js'

import { getActivity } from '../selectors/activity.selectors.js'

import { openText, closeText } from '../actions/textActivity.action.js'

function mapStateToProps (state, props) {
  return {
    activity: getActivity(state, props)
  }
}

function mapDispatchTopProps (dispatch) {
  return {
    onReadText: (uuid) => dispatch(openText(uuid)),
    onCloseText: (uuid) => dispatch(closeText(uuid))

  }
}

const TextActivity = connect(
  mapStateToProps,
  mapDispatchTopProps
)(TextActivityComponent)

export default TextActivity
