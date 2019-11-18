import React from 'react'
import PropTypes from 'prop-types'

import {
  ACTIVITY_TYPE_TEXT
} from '../constants/activity.constants.js'

import TextActivity from '../containers/textActivity.container.js'

import '../styles/activity.scss'

export default function ActitityWrapper ({ activityType, uuid }) {
  switch (activityType) {
    case ACTIVITY_TYPE_TEXT:
      return (<TextActivity uuid={uuid} />)
    default:
      return (<div>TODO</div>)
  }
}

ActitityWrapper.propTypes = {
  activityType: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired
}
