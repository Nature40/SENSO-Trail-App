import React from 'react'
import PropTypes from 'prop-types'

import {
  ACTIVITY_TYPE_TEXT,
  ACTIVITY_TYPE_IMAGE,
  ACTIVITY_TYPE_MULTI_CHOICE
} from '../constants/activity.constants.js'

import TextActivity from '../containers/textActivity.container.js'

import ImageActivity from '../containers/imageActivity.container.js'

import MultiChoiceActivity from '../containers/multiChoiceActivity.container.js'

import '../styles/activity.scss'

export default function ActitityWrapper ({ activityType, uuid }) {
  switch (activityType) {
    case ACTIVITY_TYPE_TEXT:
      return (<TextActivity uuid={uuid} />)
    case ACTIVITY_TYPE_IMAGE:
      return (<ImageActivity uuid={uuid} />)
    case ACTIVITY_TYPE_MULTI_CHOICE:
      return (<MultiChoiceActivity uuid={uuid} />)
    default:
      return (<div>TODO</div>)
  }
}

ActitityWrapper.propTypes = {
  activityType: PropTypes.string.isRequired,
  uuid: PropTypes.string.isRequired
}
