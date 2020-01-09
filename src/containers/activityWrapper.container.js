import { connect } from 'react-redux'

import { getActivityBySlug } from '../selectors/activity.selectors.js'

import ActitityWrapper from '../components/activityWrapper.js'

function mapStateToProps (state, props) {
  const slug = props.match.params.activitySlug
  const activity = getActivityBySlug(state, {slug})
  return {
    activityType: activity.activityType,
    uuid: activity.uuid
  }
}

function mapDispatchTopProps (dispatch) {
  return {

  }
}

const Activity = connect(
  mapStateToProps,
  mapDispatchTopProps
)(ActitityWrapper)

export default Activity
