import { connect } from 'react-redux'

import ImageActivityComponent from '../components/imageActivity.js'

import { getActivity } from '../selectors/activity.selectors.js'

import { completeActivity } from '../actions/activity.action.js'

function mapStateToProps (state, props) {
  return {
    activity: getActivity(state, props)
  }
}

function mapDispatchTopProps (dispatch) {
  return {
    onViewImage: (uuid) => dispatch(completeActivity(uuid)),
  }
}

const ImageActivity = connect(
  mapStateToProps,
  mapDispatchTopProps
)(ImageActivityComponent)

export default ImageActivity
