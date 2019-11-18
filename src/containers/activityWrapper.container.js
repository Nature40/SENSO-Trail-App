import { connect } from 'react-redux'

import { getActivityType } from '../selectors/activity.selectors.js'

import ActitityWrapper from '../components/activityWrapper.js'

function mapStateToProps (state, props) {
  return {
    activityType: getActivityType(state, props)
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
